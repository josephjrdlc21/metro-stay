<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
   /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(
            \App\Laravel\Events\CustomerVerifyEvent::class, 
            \App\Laravel\Listeners\CustomerVerifyListener::class,
        );
    }
}