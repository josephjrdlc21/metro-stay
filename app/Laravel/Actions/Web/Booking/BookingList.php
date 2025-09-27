<?php

namespace App\Laravel\Actions\Web\Booking;

use App\Laravel\Models\Booking;

use Carbon\Carbon;

class BookingList{
    private array $data = [];
    private ?int $per_page;

    public function __construct(
        array $data = [],
        ?int $per_page = null
    ) {
        $this->data = $data;
        $this->per_page = $per_page;
    }

    public function execute(): array {
        $record = Booking::when(strlen($this->data['keyword']) > 0, function ($query) {
            $query->whereRaw("LOWER(ref_no) LIKE '%{$this->data['keyword']}%'");
        })
        ->latest()
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}