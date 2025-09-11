<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Requests\PageRequest;

use App\Laravel\Actions\Web\Main\MainList;

use Inertia\Response;

class MainController extends Controller{
    protected $data;

    public function __construct()
    {
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Main";
    }

    public function index(PageRequest $request): Response
    {
        $this->data['page_title'] .= " - Dashboard";

        $list = new MainList;
        $result = $list->execute($request->validated());

        $this->data['result'] = $result;

        return inertia('modules/index', ['data' => $this->data]);
    }
}