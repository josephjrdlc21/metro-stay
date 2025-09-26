<?php

Route::group(['prefix' => "customers", 'as' => "customers."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "CustomerController@index"]);
    Route::get('/edit-status/{id?}',  ['as' => "update_status", 'uses' => "CustomerController@update_status"]);
    Route::get('/edit-password/{id?}',  ['as' => "update_password", 'uses' => "CustomerController@update_password"]);
    Route::get('/show/{id?}',  ['as' => "show", 'uses' => "CustomerController@show"]);
});