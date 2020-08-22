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
