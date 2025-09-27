<?php

namespace App\Laravel\Actions\Web\Hotel;

use App\Laravel\Models\Booking;
use App\Laravel\Models\Payment;
use App\Laravel\Models\Room;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BookCreate{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $room = Room::where('room_type_id', $this->request['id'])->where('status', 'available')->first();

        if(!$room){
            return ['success' => false, 'status' => "failed", 'message' => "The selected room is not available for the chosen dates."];
        }

        DB::beginTransaction();
        try {
            $room->status = "reserved"; /* [available, reserved, occupied, maintenance] */
            $room->save();

            $booking = new Booking;
            $booking->ref_no = 'BK-' . now()->format('Ymd') . '-' . mt_rand(1000, 9999);
            $booking->customer_id = $this->request['customer'];
            $booking->room_id = $room->id;
            $booking->room_number = $room->room_number;
            $booking->room_type_name = $room->room_type->name;
            $booking->guest = $this->request['guest'];
            $booking->check_in = $this->request['check_in'];
            $booking->check_out = $this->request['check_out'];
            $booking->status = "pending"; /* [pending, confirmed, reserved, cancelled, checked_in, checked out, completed] */

            $check_in = Carbon::parse($this->request['check_in']);
            $check_out = Carbon::parse($this->request['check_out']);
            $nights = $check_in->diffInDays($check_out);

            $booking->total_amount = $room->room_type->price * $nights;
            $booking->save();

            $payment = new Payment;
            $payment->ref_no = 'PMT-' . now()->format('Ymd') . '-' . mt_rand(1000, 9999);
            $payment->booking_id = $booking->id;
            $payment->amount = $booking->total_amount;
            $payment->status = "unpaid"; /* [unpaid, paid, refunded, failed] */
            $payment->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Booking has been created. Please complete payment to confirm your stay."];
    }
}