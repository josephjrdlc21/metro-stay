<?php

Route::group(['as' => "auth."], function() {
    Route::group(['middleware' => "web.guest"], function(){
        Route::get('/login',  ['as' => "login", 'uses' => "AuthenticateController@login"]);
        Route::post('/login',  ['uses' => "AuthenticateController@authenticate"]);
        Route::get('/register',  ['as' => "register", 'uses' => "AuthenticateController@register"]);
        Route::post('/register',  ['uses' => "AuthenticateController@store"]);
    });

    Route::get('/logout', ['as' => "logout", 'uses' => "AuthenticateController@logout"]);
});