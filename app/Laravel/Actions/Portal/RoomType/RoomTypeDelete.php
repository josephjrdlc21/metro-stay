<?php

namespace App\Laravel\Actions\Portal\RoomType;

use App\Laravel\Models\RoomType;
use App\Laravel\Models\Room;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Laravel\Services\ImageUploader;

class RoomTypeDelete{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $room_type = RoomType::find($this->request['id']);

        if(!$room_type){
            return ['success' => false, 'status' => "failed", 'message' => "Record not found."];
        }
        
        $room = Room::where('room_type_id', $room_type->id)->where('status', '<>', 'available')->count();

        if($room > 0){
            return ['success' => false, 'status' => "failed", 'message' => "Unable to delete room type. There are still room occupied."];
        }

        $has_bookings = Room::where('room_type_id', $room_type->id)->whereHas('booking')->exists();

        if($has_bookings) {
            return ['success' => false, 'status'  => 'failed', 'message' => 'Unable to delete room type. There are still rooms with bookings.'];
        }

        DB::beginTransaction();
        try {
            $room_type->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Room type has been deleted successfully."];
    }
}