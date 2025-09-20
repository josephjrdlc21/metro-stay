<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Portal";

Route::group(['prefix' => "admin", 'as' => "portal.", 'namespace' => $namespace, 'middleware' => ["web"]], function() {
    
    include_once app_path('Laravel/Routes/Portal/Auth.php');

    Route::group(['middleware' => "portal.auth"], function(){
        Route::get('/',  ['as' => "index", 'uses' => "MainController@index"]);

        include_once app_path('Laravel/Routes/Portal/User.php');
    });
});
