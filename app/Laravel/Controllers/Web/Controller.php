<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Controllers\Controller as BaseController;

class Controller extends BaseController{
    protected $data;

    public function get_data(){
        $this->data['page_title'] = env("APP_NAME");
        
		return $this->data;
	}
}