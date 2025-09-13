<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Portal";

Route::group(['prefix' => "admin", 'as' => "portal.", 'namespace' => $namespace, 'middleware' => ["web"]], function() {
    Route::get('/',  ['as' => "index", 'uses' => "MainController@index"]);
});
