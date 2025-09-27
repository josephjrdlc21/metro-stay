<?php

Route::group(['prefix' => "hotels", 'as' => "hotels."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "HotelController@index"]);
    Route::get('/book/{id?}', ['as' => "book", 'uses' => "HotelController@book"]);
    Route::post('/book/{id?}', ['uses' => "HotelController@store_book"]);
});