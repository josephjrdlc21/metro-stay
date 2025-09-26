<?php

Route::group(['prefix' => "hotels", 'as' => "hotels."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "HotelController@index"]);
    Route::get('/show/{id?}', ['as' => "show", 'uses' => "HotelController@show"]);
});