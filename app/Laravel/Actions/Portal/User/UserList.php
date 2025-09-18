<?php

namespace App\Laravel\Actions\Portal\User;

use App\Laravel\Models\User;

use Carbon\Carbon;

class UserList{
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
        $record = User::where(function ($query) {
            if (strlen($this->data['keyword']) > 0) {
                $query->whereRaw("LOWER(name) LIKE '%{$this->data['keyword']}%'")
                    ->orWhereRaw("LOWER(email) LIKE '%{$this->data['keyword']}%'");
            }
        })
        ->where(function ($query) {
            if (strlen($this->data['selected_status']) > 0) {
                $query->where('status', $this->data['selected_status']);
            }
        })
        ->where(function ($query) {
            $query->where(function ($q) {
                if (strlen($this->data['start_date']) > 0) {
                    $q->whereDate('created_at', '>=', Carbon::parse($this->data['start_date'])->format("Y-m-d"));
                }
            })->where(function ($q) {
                if (strlen($this->data['end_date']) > 0) {
                    $q->whereDate('created_at', '<=', Carbon::parse($this->data['end_date'])->format("Y-m-d"));
                }
            });
        })
        ->latest()
        ->where('id', '!=', '1')
        ->paginate($this->per_page);

        return ['record' => $record];
    }
}