<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lecturer extends Model
{
    protected $fillable = [
        'user_id',
        'nidn',
        'nip',
        'nama_lengkap',
        'gelar_depan',
        'gelar_belakang',
        'email',
        'no_hp',
        'alamat',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'jenjang_pendidikan',
        'jabatan',
        'status_kepegawaian',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    /**
     * Get the user that owns the lecturer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the classes taught by the lecturer.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassModel::class , 'dosen_id');
    }

    /**
     * Get the KRS approved by the lecturer.
     */
    public function approvedKrs(): HasMany
    {
        return $this->hasMany(StudentKrs::class , 'disetujui_oleh');
    }

    /**
     * Get full name with titles.
     */
    public function getFullNameAttribute(): string
    {
        $name = $this->nama_lengkap;
        if ($this->gelar_depan) {
            $name = $this->gelar_depan . ' ' . $name;
        }
        if ($this->gelar_belakang) {
            $name = $name . ', ' . $this->gelar_belakang;
        }
        return $name;
    }
}