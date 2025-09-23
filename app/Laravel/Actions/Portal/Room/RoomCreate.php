<?php

namespace App\Laravel\Actions\Portal\Room;

use App\Laravel\Models\Room;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoomCreate{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $room = new Room;
            $room->room_number = $this->request['room_number'];
            $room->room_type_id = $this->request['bed_type'];
            $room->status = $this->request['status'];
            $room->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "New room has been successfully created."];
    }
}