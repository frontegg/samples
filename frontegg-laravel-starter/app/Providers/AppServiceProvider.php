<?php

namespace App\Providers;

use Frontegg\Frontegg;
use Illuminate\Support\ServiceProvider;
use Psr\Http\Message\RequestInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

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
}
