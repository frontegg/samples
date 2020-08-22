# Frontegg PHP SDK Demo with Laravel

![alt text](https://fronteggstuff.blob.core.windows.net/frongegg-logos/logo-transparent.png)

This is an integration guid an `frontegg/php-sdk` for fresh Laravel project

## Installation

```bash
composer require frontegg/php-sdk
```

Setup config file in `./config/frontegg.php`

````php
<?php

return [
    'clientId' => 'YOUR_CLIENT_ID',
    'clientSecret' => 'YOUR_SECRET_API_KEY',
    'apiBaseUrl' => 'https://api.frontegg.com/',
    'apiUrls' => [
        'authentication' => '/auth/vendor',
        'audits' => '/audits',
        'events' => '/event/resources/triggers/v2'
    ]
];
````

Inject `Frontegg` main class to Laravel `AppServiceProvider (app\Providers\AppServiceProvider.php)`
using service-container mechanism.
````
    ...

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind('Frontegg\Frontegg', function ($pararms) {
            $config = [
                'clientId' => config('frontegg.clientId'),
                'clientSecret' => config('frontegg.clientSecret'),
                'apiBaseUrl' => config('frontegg.apiBaseUrl'),
                'apiUrls' => config('frontegg.apiUrls'),
                'contextResolver' => function(RequestInterface $request)  {
                    return [
                    ];
                },
                'disableCors' => false,
            ];
            return new Frontegg($config);
        });
    }
````

###Usage

Inside controller, you should make DI of a `Frontegg` class

````php
class FronteggController extends Controller
{
    /**
     * @var Frontegg
     */
    protected $frontegg;

    /**
     * @param Frontegg $frontegg
     */
    public function __construct(Frontegg $frontegg)
    {
        $this->frontegg = $frontegg;
    }

}
````

### Examples
Sending auth-request

````php
    /**
     * @return JsonResponse
     */
    public function auth()
    {
        $this->frontegg->init();

        return new JsonResponse([
            'access_token' => $this->frontegg->getAuthenticator()->getAccessToken()->getValue(),
            'expires_at' => $this->frontegg->getAuthenticator()->getAccessToken()->getExpiresAt()
        ]);
    }
````

Sending Audit request

````php
    /**
     * @param string $tenantId
     * @param FronteggSendAuditsRequest $request
     *
     * @return JsonResponse
     *
     * @throws \Frontegg\Exception\AuthenticationException
     * @throws \Frontegg\Exception\FronteggSDKException
     * @throws \Frontegg\Exception\InvalidParameterException
     * @throws \Frontegg\Exception\InvalidUrlConfigException
     */
    public function sendAudits(string $tenantId, FronteggSendAuditsRequest $request)
    {
        $auditLogResponse = $this->frontegg
            ->sendAudit($tenantId, $request->only(['user', 'resource', 'action', 'severity', 'ip']));

        return new JsonResponse($auditLogResponse);
    }
````
Retrieving audit logs

````php
    /**
     * @param string $tenantId
     *
     * @return JsonResponse
     *
     * @throws \Frontegg\Exception\AuthenticationException
     */
    public function getAudits(string $tenantId)
    {
        return new JsonResponse($this->frontegg->getAudits($tenantId));
    }
````

Triggering events

````php
    /**
     * @param string $tenantId
     * @param string $eventKey
     * @param FronteggTriggerEventRequest $request
     *
     * @return JsonResponse
     *
     * @throws \Frontegg\Exception\EventTriggerException
     * @throws \Frontegg\Exception\FronteggSDKException
     * @throws \Frontegg\Exception\InvalidParameterException
     * @throws \Frontegg\Exception\InvalidUrlConfigException
     */
    public function triggerEvent(string $tenantId, string $eventKey, FronteggTriggerEventRequest $request)
    {
        $triggerOptions = new TriggerOptions(
            $eventKey,
            new DefaultProperties(
                $request->title,
                $request->description
            ),
            new ChannelsConfig(
                new WebHookBody([
                    'title' => 'Test title!',
                ])
            ),
            $tenantId
        );

        $response = $this->frontegg->triggerEvent($triggerOptions);

        if (!$response) {
            return new JsonResponse($response, Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse($response, Response::HTTP_OK);
    }
````

###Middleware

You can proxy all requests through `/api/frontegg/.....` route, by adding:

````php
Route::group(['prefix' => '/frontegg', 'middleware' => 'frontegg'], function (Router $route) {
    $route->any('/{path?}')->where('path', '.*');
});
````

You should also create separate middleware and register them in `Kernel`.
````php
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     *
     * @throws \Exception
     */
    public function handle($request, Closure $next)
    {

        $tenantId = $request->tenantId;
        $neededRequestUri = str_replace('/api/frontegg', '', $request->getRequestUri());
        $adapterRequest = new Request($request->getMethod(), $neededRequestUri, $request->header(), $request->getContent());

        $config = [
            'clientId' => config('frontegg.clientId'),
            'clientSecret' => config('frontegg.clientSecret'),
            'apiBaseUrl' => config('frontegg.apiBaseUrl'),
            'apiUrls' => config('frontegg.apiUrls'),
            'contextResolver' => function(RequestInterface $request) use ($tenantId) {
                return [
                    'tenantId' => $tenantId,
                    'userId' => 'test-user-id',
                    'permissions' => [],
                ];
            },
            'disableCors' => false,
        ];

        $frontegg = new Frontegg($config);

        $response = $frontegg->forward($adapterRequest);

        return new JsonResponse(json_decode($response->getBody()));
    }
````

### Define API routes
In `./routes/api.php` you should define the exactly routes you need.

Example: 
````php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/auth', 'FronteggController@auth');
Route::get('/audits/{tenantId}', 'FronteggController@getAudits');
Route::post('/audits/{tenantId}', 'FronteggController@sendAudits');
Route::post('/triggerEvent/{tenantId}/{eventKey}', 'FronteggController@triggerEvent');


Route::group(['prefix' => '/frontegg', 'middleware' => 'frontegg'], function (Router $route) {
    $route->any('/{path?}')->where('path', '.*');
});
````


###To Run Application locally:
Make sure you have installed php 7.3

````bash
php artisan serve
````
