<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * Max-length constraints prevent oversized payload attacks.
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:50', 'min:3'],
            'password' => ['required', 'string', 'max:100', 'min:6'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'username.required' => 'Username wajib diisi.',
            'username.max' => 'Username terlalu panjang.',
            'username.min' => 'Username terlalu pendek.',
            'password.required' => 'Password wajib diisi.',
            'password.max' => 'Password terlalu panjang.',
            'password.min' => 'Password minimal 6 karakter.',
        ];
    }
}