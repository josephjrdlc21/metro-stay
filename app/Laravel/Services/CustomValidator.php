<?php

namespace App\Laravel\Services;

use App\Laravel\Models\User;
use App\Laravel\Models\RoomType;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;
use Propaganistas\LaravelPhone\PhoneNumber;
use Carbon\Carbon;

class CustomValidator extends Validator {

    /**
     * rule name: current_password
     *
     */
    public function validateCurrentPassword($attribute, $value, $parameters){
        $user = auth('web')->user();
        return Hash::check($value,$user->password) ? TRUE : FALSE;
    }

    /**
     * rule name: password_format
     *
     */
    public function validatePasswordFormat($attribute,$value,$parameters){
        return preg_match('/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+.<>])[A-Za-z\d!@#$%^&*()_+.<>]{6,20}$/', $value);
    }

    /**
     * rule name: username_format
     *
     */
    public function validateUsernameFormat($attribute,$value,$parameters){
        return preg_match(("/^(?=.*)[A-Za-z\d][a-z\d._+]{6,20}$/"), $value);
    }

    /**
     * rule name: unique_phone
     *
     */
    public function validateUniquePhone($attribute, $value, $parameters)
    {
        $id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
        $type = (is_array($parameters) and isset($parameters[1])) ? $parameters[1] : "user";

        try {
            $contact_number = new PhoneNumber($value, "PH");
            $contact_number = $contact_number->formatE164();

            if (!preg_match('/^\+639\d{9}$/', $contact_number)) {
                return false;
            }
        } catch (\Exception $e) {
            return false;
        }

        switch (strtolower($type)) {
            case 'customer':
                return  Customer::where('mobile_number', $contact_number)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            case 'merchant':
                return  Merchant::where('mobile_number', $contact_number)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            default:
                return User::where('contact_no', $contact_number)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
        }
    }

    public function validateTelephone($attribute, $value, $parameters)
    {
        if (preg_match('/^(?:\+63\d{8,9}|0\d{8,9})$/', $value)) {
            return true;
        }

        return false;
    }

    public function validateStreetNameFormat($attribute, $value, $parameters)
    {
        return preg_match(("/^[ A-Za-z0-9 _.\/()-]*$/"), $value);
    }

    public function validateAllowedCountry($attribute, $value, $parameters)
    {
        $contact_number = new PhoneNumber($value);
        
        $allowed_countries = explode(",", env("ALLOWED_COUNTRY_CODE", "PH"));
        return in_array($contact_number->getCountry() ?: "PH", $allowed_countries) ? true : false;
    }

    /**
     * rule name: unique_email
     *
     */
    public function validateUniqueEmail($attribute, $value, $parameters)
    {
        $email = strtolower($value);
        $id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
        $type = (is_array($parameters) and isset($parameters[1])) ? $parameters[1] : "user";

        switch (strtolower($type)) {
            case 'customer':
                return  Customer::where('email', $email)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            case 'merchant':
                return  Merchant::where('email', $email)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            default:
                return  User::where('email', $email)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
        }
    }

    public function validateUniqueName($attribute,$value,$parameters){   
        $name = strtolower($value);
        $id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
        $type = (is_array($parameters) and isset($parameters[1])) ? $parameters[1] : "user";

        switch (strtolower($type)) {
            case 'room_type':
                return  RoomType::where('name', $name)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            case 'bed_type':
                return  RoomType::where('bed_type', $name)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            default:
                return User::where('name', $name)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
        }
    }
}