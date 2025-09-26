<?php

namespace App\Laravel\Actions\Portal\Customer;

use App\Laravel\Models\Customer;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CustomerUpdatePassword{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $customer = Customer::find($this->request['id']);

        if(!$customer){
            return ['success' => false, 'status' => "failed", 'message' => "Record not found."];
        }

        DB::beginTransaction();
        try {
            $password = Str::random(8);

            $customer->password = bcrypt($password);
            $customer->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Customer password has been reset. New password was sent to email."];
    }
}