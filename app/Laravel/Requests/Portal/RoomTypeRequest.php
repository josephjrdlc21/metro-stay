<?php

namespace App\Laravel\Requests\Portal;

use App\Laravel\Requests\RequestManager;

class RoomTypeRequest extends RequestManager
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
            'name' => "required|unique_name:{$id},room_type",
            'bed_type' => "required|unique_name:{$id},bed_type",
            'price' => "required|numeric|min:0.01",
            'capacity' => "required|integer|min:1",
            'description' => "required",
            'amenities' => "required|array",
            'amenities.*' => 'string|max:50',
        ];

        if ($id > 0) {
            $rules['image'] = 'nullable|mimes:png,jpg|max:2048';
        } 
        else {
            $rules['image'] = 'required|mimes:png,jpg|max:2048';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'required' => "Field is required.",
            'name.unique_name' => "Room type name has already taken.",
            'bed_type.unique_name' => "Bed type has already taken.",
            'image.min' => "The file must be at least 1 KB.",
            'image.max' => "The file may not be greater than 2 MB.",
            'amenities.required' => "Please input at least one amenity.",
            'amenities.array' => "The amenities must be an array.",
            'amenities.*.string' => "Each amenity must be a valid text.",
            'amenities.*.max' => "Each amenity may not be greater than 50 characters.",
        ];
    }
}