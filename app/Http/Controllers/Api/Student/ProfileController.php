<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user()->load('student.major.faculty')
        ]);
    }

    public function update(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Profile updated'
        ]);
    }
}
