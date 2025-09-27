<?php

namespace App\Laravel\Controllers\Web;

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
		if (auth('web')->user()) {
        	$this->data['auth'] = auth('web')->user();
		}
	}
}