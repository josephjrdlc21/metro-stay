<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Controllers\Controller as BaseController;

class Controller extends BaseController{
    protected array $data = [];

    public function __construct(){
        
    }

    public function get_data(): array {
        $this->data['page_title'] = env("APP_NAME");
        
		return $this->data;
	}
}