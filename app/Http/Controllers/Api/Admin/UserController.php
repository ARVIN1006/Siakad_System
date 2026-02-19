<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => User::with(['role', 'student', 'lecturer'])->get()
        ]);
    }

    public function roles()
    {
        return response()->json([
            'success' => true,
            'data' => Role::all()
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $role = Role::find($request->role_id);
        $roleName = strtolower($role->name);

        return DB::transaction(function () use ($request, $roleName) {
            $user = User::create([
                'username' => $request->username,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
            ]);

            if ($roleName === 'mahasiswa') {
                Student::create([
                    'user_id' => $user->id,
                    'nim' => $request->nim,
                    'nama_lengkap' => $request->name,
                    'prodi_id' => $request->prodi_id,
                    'email' => $request->email,
                    'status' => 'Aktif',
                    'angkatan' => $request->angkatan ?? date('Y'),
                ]);
            }
            elseif ($roleName === 'dosen') {
                Lecturer::create([
                    'user_id' => $user->id,
                    'nidn' => $request->nidn,
                    'nama_lengkap' => $request->name,
                    'email' => $request->email,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dibuat',
                'data' => $user->load(['role', 'student', 'lecturer'])
            ], 201);
        });
    }

    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'data' => $user->load(['role', 'student', 'lecturer'])
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id,
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => Hash::make($request->password)]);
        }

        return response()->json([
            'success' => true,
            'message' => 'User berhasil diperbarui',
            'data' => $user->load(['role', 'student', 'lecturer'])
        ]);
    }

    public function destroy(User $user)
    {
        return DB::transaction(function () use ($user) {
            if ($user->student)
                $user->student->delete();
            if ($user->lecturer)
                $user->lecturer->delete();
            $user->tokens()->delete();
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus'
            ]);
        });
    }
}