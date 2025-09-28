<?php

Route::group(['prefix' => "payments", 'as' => "payments."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "PaymentController@index"]);
});