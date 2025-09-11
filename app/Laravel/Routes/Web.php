<?php

use Illuminate\Support\Facades\Route;
$namespace = "App\Laravel\Controllers\Web";

Route::group(['as' => "web.", 'namespace' => $namespace, 'middleware' => ["web"]], function() {
    Route::get('/', function () {
        return inertia('modules/index');
    });
});
