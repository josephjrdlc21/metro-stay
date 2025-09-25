<?php

namespace App\Laravel\Controllers\Web;

use App\Laravel\Actions\Web\Authenticate\{AuthenticateLogin, AuthenticateLogout,
 AuthenticateRegister};

use App\Laravel\Requests\PageRequest;
use App\Laravel\Requests\Web\AuthenticateRequest;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AuthenticateController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?string $guard;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Main";
        $this->guard = "web";
    }

    public function login(PageRequest $request): Response {
        $this->data['page_title'] .= " - Login";

        return inertia('modules/auth/auth-login', ['values' => $this->data]);
    }

    public function authenticate(PageRequest $request): RedirectResponse {
        $action = new AuthenticateLogin(
            $request->input('email'),
            $request->input('password'),
            $this->guard
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('web.index') : redirect()->route('web.auth.login');
    }

    public function register(PageRequest $request): Response {
        $this->data['page_title'] .= " - Register";

        return inertia('modules/auth/auth-register', ['values' => $this->data]);
    }

    public function store(AuthenticateRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');
        $this->request['password'] = $request->input('password');
        $this->request['phone_number'] = $request->input('phone_number');

        $action = new AuthenticateRegister(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('web.auth.login') : redirect()->back();
    }

    public function logout(PageRequest $request): RedirectResponse {
        $action = new AuthenticateLogout(
            $this->guard
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('web.auth.login') : redirect()->route('web.index');
    }
}