<?php

namespace App\Laravel\Actions\Portal\User;

use App\Laravel\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserUpdateStatus{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $user = User::find($this->request['id']);
            $user->name = Str::title($this->request['name']);
            $user->email = Str::lower($this->request['email']);
            $user->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "User details has been updated."];
    }
}