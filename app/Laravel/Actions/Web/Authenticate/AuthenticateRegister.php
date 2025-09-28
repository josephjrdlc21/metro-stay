<?php

namespace App\Laravel\Actions\Web\Authenticate;

use App\Laravel\Models\Customer;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Laravel\Services\Helper;

class AuthenticateRegister{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $customer = new Customer;
            $customer->name = Str::title($this->request['name']);
            $customer->email = Str::lower($this->request['email']);
            $customer->password = bcrypt($this->request['password']);
            $customer->phone_number = Helper::format_phone($this->request['phone_number']);
            $customer->status = "active";
            $customer->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Successfully registered. Please log in your account."];
    }
}