<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Api";

Route::group(['as' => "api.", 'namespace' => $namespace, 'middleware' => ["api"]],function() {
    Route::get('/', function(){
        return response()->json('API TEST', 200);
    });
});