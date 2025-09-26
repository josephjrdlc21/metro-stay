<?php

Route::group(['prefix' => "hotels", 'as' => "hotels."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "HotelController@index"]);
});