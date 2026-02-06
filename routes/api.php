<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Student\ProfileController;
use App\Http\Controllers\Api\Student\KrsController;
use App\Http\Controllers\Api\Lecturer\GradeController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class , 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class , 'logout']);
    Route::get('/me', [AuthController::class , 'me']);

    // Student routes
    Route::prefix('student')->group(function () {
            Route::get('/profile', [ProfileController::class , 'show']);
            Route::put('/profile', [ProfileController::class , 'update']);
            Route::get('/krs', [KrsController::class , 'index']);
            Route::post('/krs', [KrsController::class , 'store']);
            Route::get('/khs', [KrsController::class , 'khs']);
        }
        );

        // Lecturer routes
        Route::prefix('lecturer')->group(function () {
            Route::get('/classes', [GradeController::class , 'classes']);
            Route::get('/classes/{id}/students', [GradeController::class , 'students']);
            Route::post('/grades', [GradeController::class , 'store']);
        }
        );

        // Admin routes
        Route::prefix('admin')->group(function () {
            Route::apiResource('users', UserController::class);
        }
        );
    });