<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Student;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

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

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:users',
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id',
            // Student specific fields
            'nim' => 'required_if:role_name,mahasiswa|nullable|string|unique:students',
            'prodi_id' => 'required_if:role_name,mahasiswa|nullable|exists:majors,id',
            // Lecturer specific fields
            'nidn' => 'required_if:role_name,dosen|nullable|string|unique:lecturers',
        ]);

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
            } elseif ($roleName === 'dosen') {
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
            ]);
        });
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => ['required', 'string', Rule::unique('users')->ignore($user->id)],
            'name' => 'required|string',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:6',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->update([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id,
        ]);

        if ($request->password) {
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
        // Transaction to ensure related records are cleaned up or handled
        return DB::transaction(function () use ($user) {
            if ($user->student) $user->student->delete();
            if ($user->lecturer) $user->lecturer->delete();
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User berhasil dihapus'
            ]);
        });
    }
}
