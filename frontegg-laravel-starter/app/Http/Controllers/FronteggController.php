<?php

namespace App\Http\Controllers;

use App\Http\Requests\FronteggSendAuditsRequest;
use App\Http\Requests\FronteggTriggerEventRequest;
use Frontegg\Events\Type\ChannelsConfig;
use Frontegg\Events\Type\DefaultProperties;
use Frontegg\Events\Type\TriggerOptions;
use Frontegg\Events\Type\WebHookBody;
use Frontegg\Frontegg;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

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

    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('frontegg');
    }

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

    /**
     * @param string $tenantId
     * @return JsonResponse
     *
     * @throws \Frontegg\Exception\AuthenticationException
     */
    public function getAudits(string $tenantId)
    {
        return new JsonResponse($this->frontegg->getAudits($tenantId));
    }

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
}
