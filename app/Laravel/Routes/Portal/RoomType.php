<?php

Route::group(['prefix' => "room-types", 'as' => "room_types."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "RoomTypeController@index"]);
    Route::get('/create',  ['as' => "create", 'uses' => "RoomTypeController@create"]);
});