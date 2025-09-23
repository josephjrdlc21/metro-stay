<?php

namespace App\Laravel\Actions\Portal\Room;

use App\Laravel\Models\Room;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoomUpdate{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $room = Room::find($this->request['id']);

        if(!$room){
            return ['success' => false, 'status' => "failed", 'message' => "Record not found."];
        }

        DB::beginTransaction();
        try {
            $room->room_number = $this->request['room_number'];
            $room->room_type_id = $this->request['bed_type'];
            $room->status = $this->request['status'];
            $room->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Room details has been updated."];
    }
}