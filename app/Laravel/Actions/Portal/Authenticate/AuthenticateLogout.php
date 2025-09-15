<?php

namespace App\Laravel\Actions\Portal\Authenticate;

class AuthenticateLogout{
    private ?string $guard;

    public function __construct(
       string $guard = null,
    ) {
       $this->guard = $guard;
    }

    public function execute(): array{
        auth($this->guard)->logout();

        return [
            'success' => true,
            'message' => "Logged out successfully.",
            'status'  => "success",
        ];
    }
}