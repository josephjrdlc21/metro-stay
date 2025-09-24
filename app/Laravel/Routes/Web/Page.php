<?php

Route::group(['as' => "page."], function() {
    Route::group(['middleware' => "web.guest"], function(){
        Route::get('/home',  ['as' => "home", 'uses' => "MainController@home"]);
    });
});