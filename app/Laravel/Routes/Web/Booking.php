<?php

Route::group(['prefix' => "bookings", 'as' => "bookings."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "BookingController@index"]);
});