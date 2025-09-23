<?php

namespace App\Laravel\Actions\Portal\Room;

use App\Laravel\Models\Room;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoomDelete{
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
            $room->delete();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Room has been successfully deleted."];
    }
}