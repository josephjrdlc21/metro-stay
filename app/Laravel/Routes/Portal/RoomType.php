<?php

Route::group(['prefix' => "room-types", 'as' => "room_types."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "RoomTypeController@index"]);
    Route::get('/create', ['as' => "create", 'uses' => "RoomTypeController@create"]);
    Route::post('/create', ['uses' => "RoomTypeController@store"]);
    Route::get('/edit/{id?}', ['as' => "edit", 'uses' => "RoomTypeController@edit"]);
    Route::post('/edit/{id?}', ['uses' => "RoomTypeController@update"]);
    Route::get('/show/{id?}', ['as' => "show", 'uses' => "RoomTypeController@show"]);
    Route::any('/delete/{id?}',  ['as' => "delete", 'uses' => "RoomTypeController@destroy"]);
});