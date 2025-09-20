<?php

Route::group(['as' => "auth."], function() {
    Route::group(['middleware' => "portal.guest"], function(){
        Route::get('/login',  ['as' => "login", 'uses' => "AuthenticateController@login"]);
        Route::post('/login',  ['uses' => "AuthenticateController@authenticate"]);
    });

    Route::get('/logout', ['as' => "logout", 'uses' => "AuthenticateController@logout"]);
});