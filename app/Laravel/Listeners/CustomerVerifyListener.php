<?php

namespace App\Laravel\Listeners;

use App\Laravel\Events\CustomerVerifyEvent;
use App\Laravel\Notifications\CustomerVerifyNotification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class CustomerVerifyListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(CustomerVerifyEvent $event)
    {
        Mail::to($event->customer->email)->send(new CustomerVerifyNotification($event->customer, $event->token));
    }
}