<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
     */
    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        return [
            'username' => ['required', 'string', 'max:50', 'min:3', 'regex:/^[a-zA-Z0-9._-]+$/', Rule::unique('users')->ignore($userId)],
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'email:rfc,dns', 'max:100', Rule::unique('users')->ignore($userId)],
            'password' => ['nullable', 'string', 'min:8', 'max:100'],
            'role_id'  => ['required', 'integer', 'exists:roles,id'],
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'username.regex' => 'Username hanya boleh mengandung huruf, angka, titik, underscore, dan tanda hubung.',
            'email.email'    => 'Format email tidak valid.',
            'password.min'   => 'Password minimal 8 karakter.',
        ];
    }
}