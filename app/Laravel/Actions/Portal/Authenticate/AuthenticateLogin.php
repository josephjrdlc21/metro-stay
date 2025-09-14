<?php

namespace App\Laravel\Actions\Portal\Authenticate;

use Illuminate\Support\Str;

class AuthenticateLogin{
    private ?string $email;
    private ?string $password;
    private ?string $guard;

    public function __construct(
        string $email = null,
        string $password = null,
        string $guard = null,
    ) {
        $this->email = $email;
        $this->password = $password;
        $this->guard = $guard;
    }

    /**
     * Attempt to authenticate a user.
     *
     * @return array{
     *     success: bool,
     *     user: Authenticatable|null,
     *     status: string,
     *     message: string
     * }
     */
    public function execute(): array{
        if (auth($this->guard)->attempt(['email' => Str::lower($this->email), 'password' => $this->password])) {
            $account = auth($this->guard)->user();

            if (Str::lower($account->status) !== "active") {
                auth($this->guard)->logout();

                return [
                    'success' => false,
                    'message' => "Account locked. Access to system was removed.",
                    'status'  => "info",
                ];
            }

            return [
                'success' => true,
                'message' => "Welcome {$account->name}!",
                'status'  => "success",
            ];
        }

        return [
            'success' => false,
            'message' => "Invalid account credentials.",
            'status'  => "failed",
        ];
    }
}