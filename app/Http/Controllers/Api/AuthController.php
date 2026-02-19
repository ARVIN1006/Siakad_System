<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login and get authentication token.
     * Protected by rate limiting against brute-force attacks.
     */
    public function login(LoginRequest $request)
    {
        $throttleKey = $this->throttleKey($request);

        // Check if already throttled (too many failed attempts)
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return response()->json([
                'success' => false,
                'message' => "Terlalu banyak percobaan login. Coba lagi dalam {$seconds} detik.",
            ], 429, ['Retry-After' => $seconds]);
        }

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Increment failed attempt counter
            RateLimiter::hit($throttleKey, 60); // Decay in 60 seconds

            throw ValidationException::withMessages([
                'username' => ['Kredensial yang diberikan tidak sesuai.'],
            ]);
        }

        // Clear throttle on successful login
        RateLimiter::clear($throttleKey);

        // Delete previous tokens (one active session per user)
        $user->tokens()->delete();

        $token = $user->createToken('api-token', ['*'], now()->addMinutes(
            (int)config('sanctum.expiration', 1440)
        ))->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user->load('role'),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Logout and revoke current token.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil',
        ]);
    }

    /**
     * Get current user information.
     */
    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('role');

        // Load specific persona based on role
        if ($user->role->name === 'mahasiswa') {
            $user->load('student.major.faculty');
        }
        elseif ($user->role->name === 'dosen') {
            $user->load('lecturer');
        }

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Get the throttle key for the given request.
     * Combining username + IP makes it harder to bypass with IP rotation.
     */
    protected function throttleKey(Request $request): string
    {
        return 'login|' . strtolower((string)$request->input('username')) . '|' . $request->ip();
    }
}