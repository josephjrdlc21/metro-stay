<?php

namespace App\Laravel\Actions\Web\Main;

use App\Laravel\Requests\PageRequest;

class MainList{

    public function execute(mixed $data): string
    {
        $data = "Sample";

        return $data;
    }
}