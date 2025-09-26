<?php

namespace App\Laravel\Actions\Portal\Customer;

use App\Laravel\Models\Customer;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CustomerUpdateStatus{
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
            $customer->status = ($customer->status == 'active') ? 'inactive' : 'active';
            $customer->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return ['success' => false, 'status' => "failed", 'message' => "Server Error: Code #{$e->getLine()}."];
        }

        return ['success' => true, 'status'  => "success", 'message' => "Customer details status has been set to {$customer->status}."];
    }
}