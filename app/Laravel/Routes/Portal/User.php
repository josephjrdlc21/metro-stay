<?php

Route::group(['prefix' => "users", 'as' => "users."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "UserController@index"]);
    Route::get('/create',  ['as' => "create", 'uses' => "UserController@create"]);
    Route::post('/create',  ['uses' => "UserController@store"]);
    Route::get('/edit/{id?}',  ['as' => "edit", 'uses' => "UserController@edit"]);
    Route::post('/edit/{id?}',  ['uses' => "UserController@update"]);
    Route::get('/edit-status/{id?}',  ['as' => "update_status", 'uses' => "UserController@update_status"]);
});