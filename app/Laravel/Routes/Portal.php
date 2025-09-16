<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Portal";

Route::group(['prefix' => "admin", 'as' => "portal.", 'namespace' => $namespace, 'middleware' => ["web"]], function() {
    Route::group(['as' => "auth."], function() {
        Route::group(['middleware' => "portal.guest"], function(){
            Route::get('/login',  ['as' => "login", 'uses' => "AuthenticateController@login"]);
            Route::post('/login',  ['uses' => "AuthenticateController@authenticate"]);
        });

        Route::get('/logout', ['as' => "logout", 'uses' => "AuthenticateController@logout"]);
    });

    Route::group(['middleware' => "portal.auth"], function(){
        Route::get('/',  ['as' => "index", 'uses' => "MainController@index"]);

        Route::group(['prefix' => "users", 'as' => "users."], function() {
            Route::get('/',  ['as' => "index", 'uses' => "UserController@index"]);
        });
    });
});
