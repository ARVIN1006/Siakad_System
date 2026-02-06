<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'prodi_id',
        'nim',
        'nama_lengkap',
        'status',
        'alamat',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'no_hp',
        'email',
        'foto',
        'kewarganegaraan',
        'golongan_darah',
        'nama_orang_tua',
        'no_hp_orang_tua',
        'angkatan',
        'ipk',
        'total_sks',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'angkatan' => 'integer',
        'ipk' => 'decimal:2',
        'total_sks' => 'integer',
    ];

    /**
     * Get the user that owns the student.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the major for the student.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class , 'prodi_id');
    }

    /**
     * Get the KRS for the student.
     */
    public function krs(): HasMany
    {
        return $this->hasMany(StudentKrs::class , 'mahasiswa_id');
    }

    /**
     * Get the grades for the student.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(StudentGrade::class , 'mahasiswa_id');
    }

    /**
     * Get the tuition fees for the student.
     */
    public function tuitionFees(): HasMany
    {
        return $this->hasMany(TuitionFee::class , 'mahasiswa_id');
    }
}