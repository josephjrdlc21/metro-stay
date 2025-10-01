<?php

Route::group(['prefix' => "payments", 'as' => "payments."], function() {
    Route::get('/',  ['as' => "index", 'uses' => "PaymentController@index"]);
    Route::get('/payment', ['as' => "payment", 'uses' => "PaymentController@payment"]);
    Route::post('/payment', ['uses' => "PaymentController@payment_store"]);
});