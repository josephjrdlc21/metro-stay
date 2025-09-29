<?php

Route::group(['prefix' => "bookings", 'as' => "bookings."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "BookingController@index"]);
    Route::get('/show/{id?}',  ['as' => "show", 'uses' => "BookingController@show"]);
});