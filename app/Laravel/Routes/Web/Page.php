<?php

Route::group(['as' => "page."], function() {
    Route::group(['middleware' => "web.guest"], function(){
        Route::get('/',  ['as' => "home", 'uses' => "MainController@home"]);
    });
});