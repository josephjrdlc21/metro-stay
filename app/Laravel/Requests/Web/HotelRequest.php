<?php

namespace App\Laravel\Requests\Web;

use App\Laravel\Requests\RequestManager;

class HotelRequest extends RequestManager
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
            'check_in' => "required",
            'check_out' => "required",
            'guest' => "required|numeric|is_capacity:{$id}",
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => "Field is required.",
            'is_capacity' => "The number of guests exceeds the room capacity.",
        ];
    }
}