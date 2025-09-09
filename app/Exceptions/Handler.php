<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Foundation\Configuration\Exceptions;

use Throwable;

class Handler extends ExceptionHandler
{
    public static function registerInExceptions(Exceptions $exceptions): void
    {
        $exceptions->renderable(function (Throwable $exception, $request){
          
        });
    }
}