<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Controllers\Controller as BaseController;

class Controller extends BaseController{
    protected array $data = [];

    public function __construct(){
        self::set_loggedin_user();
    }

    public function get_data(): array {
        $this->data['page_title'] = env("APP_NAME");
        
		return $this->data;
	}

    public function set_loggedin_user(){
		if (auth('portal')->user()) {
        	$this->data['auth'] = auth('portal')->user();
		}
	}
}