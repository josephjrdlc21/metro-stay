<?php

namespace App\Laravel\Controllers\Portal;

use App\Laravel\Actions\Portal\Authenticate\AuthenticateLogin;

use App\Laravel\Requests\PageRequest;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AuthenticateController extends Controller{
    protected array $data = [];
    protected ?string $guard;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= " - Main";
        $this->guard = "portal";
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

        return $result['success'] ? redirect()->route('portal.index') : redirect()->route('portal.auth.login');
    }
}