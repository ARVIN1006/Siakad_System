<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KrsController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }

    public function khs()
    {
        return response()->json([
            'success' => true,
            'data' => []
        ]);
    }
}
