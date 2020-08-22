<?php

namespace App\Http\Middleware;

use Closure;
use Frontegg\Frontegg;
use Illuminate\Http\JsonResponse;
use Psr\Http\Message\RequestInterface;
use GuzzleHttp\Psr7\Request;

class FronteggProxy
{


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
}
