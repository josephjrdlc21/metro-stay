<?php

Route::group(['prefix' => "rooms", 'as' => "rooms."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "RoomController@index"]);
    Route::get('/create', ['as' => "create", 'uses' => "RoomController@create"]);
    Route::post('/create', ['uses' => "RoomController@store"]);
    Route::get('/edit/{id?}', ['as' => "edit", 'uses' => "RoomController@edit"]);
    Route::post('/edit/{id?}', ['uses' => "RoomController@update"]);
    Route::any('/delete/{id?}',  ['as' => "delete", 'uses' => "RoomController@destroy"]);
});