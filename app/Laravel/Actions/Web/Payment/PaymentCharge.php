<?php

namespace App\Laravel\Actions\Web\Payment;

class PaymentCharge{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $charge = new PaymentService();
        $result = $charge->charge_card(
            $this->request['token_id'],
            $this->request['amount']
        );

        return ['result' => $result];
    }
}