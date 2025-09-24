<?php

namespace App\Laravel\Actions\Web\Authenticate;

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

            return ['success' => true, 'status'  => "success", 'message' => "Welcome {$account->name}!"];
        }

        return ['success' => false, 'status'  => "failed", 'message' => "Invalid account credentials."];
    }
}