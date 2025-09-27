<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Web";

Route::group(['as' => "web.", 'namespace' => $namespace, 'middleware' => ["web"]], function() {
    include_once app_path('Laravel/Routes/Web/Page.php');
    include_once app_path('Laravel/Routes/Web/Auth.php');

    Route::group(['middleware' => "web.auth"], function(){
        Route::get('/dashboard',  ['as' => "index", 'uses' => "MainController@index"]);

        include_once app_path('Laravel/Routes/Web/Hotel.php');
        include_once app_path('Laravel/Routes/Web/Booking.php');
    });
});
