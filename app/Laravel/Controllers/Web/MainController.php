<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Requests\PageRequest;

use Inertia\Response;

class MainController extends Controller{
    protected array $data = [];

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Main";
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - Dashboard";

        return inertia('modules/index', ['values' => $this->data]);
    }

    public function home(PageRequest $request): Response {
        $this->data['page_title'] .= " - Home";

        return inertia('modules/pages/home', ['values' => $this->data]);
    }
}