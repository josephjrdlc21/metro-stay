<?php

namespace App\Laravel\Actions\Portal\RoomType;

use App\Laravel\Models\RoomType;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Laravel\Services\ImageUploader;

class RoomTypeUpdate{
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

        DB::beginTransaction();
        try {
            $room_type->name = Str::title($this->request['name']);
            $room_type->bed_type = Str::title($this->request['bed_type']);
            $room_type->capacity = $this->request['capacity'];
            $room_type->price = $this->request['price'];
            $room_type->description = $this->request['description'];
            $room_type->amenities = $this->request['amenities'];
            $room_type->save();

            if($this->request['image']){
                $image = ImageUploader::upload($this->request['image'], "uploads/room-type/{$room_type->id}");

                $room_type->path = $image['path'];
                $room_type->directory = $image['directory'];
                $room_type->filename = $image['filename'];
                $room_type->source = $image['source'];
                $room_type->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Room type details has been updated."];
    }
}