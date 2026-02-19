<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
     * Strict type and length validation to prevent SQL injection via input.
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:50', 'min:3', 'unique:users', 'regex:/^[a-zA-Z0-9._-]+$/'],
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email:rfc,dns', 'max:100', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'max:100'],
            'role_id' => ['required', 'integer', 'exists:roles,id'],
            // Student specific fields
            'nim' => ['nullable', 'string', 'max:20', 'unique:students', Rule::requiredIf(function () {
            return request()->input('role_name') === 'mahasiswa';
        })],
            'prodi_id' => ['nullable', 'integer', 'exists:majors,id'],
            'angkatan' => ['nullable', 'integer', 'min:1990', 'max:' . (date('Y') + 1)],
            // Lecturer specific fields
            'nidn' => ['nullable', 'string', 'max:20', 'unique:lecturers', Rule::requiredIf(function () {
            return request()->input('role_name') === 'dosen';
        })],
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'username.regex' => 'Username hanya boleh mengandung huruf, angka, titik, underscore, dan tanda hubung.',
            'email.email' => 'Format email tidak valid.',
            'password.min' => 'Password minimal 8 karakter.',
        ];
    }
}