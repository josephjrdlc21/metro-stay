<?php

namespace App\Laravel\Requests\Web;

use App\Laravel\Requests\RequestManager;

class AuthenticateRequest extends RequestManager
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->id ?? 0;

        $rules = [
            'name' => "required",
            'email' => "required|email:rfc,dns|unique_email:{$id},customer",
            'phone_number' => "required|phone:PH|unique_phone:{$id},customer",
            'password' => "required|confirmed|password_format",
            'password_confirmation' => "required",
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => "Field is required.",
            'email.email' => "Invalid email address.",
            'email.unique_email' => "Email address is already used.",
            'phone_number.phone' => "Invalid PH phone number.",
            'phone_number.unique_phone' => "Phone number already used.",
            'password_format' => "Password must be 6–20 characters long, contain at least one uppercase letter, and at least one special character (!@#$%^&*()_+.<>)",
        ];
    }
}