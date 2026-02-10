<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login and get authentication token
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Delete previous tokens
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user->load('role'),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Logout and revoke current token
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Get current user information
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
}