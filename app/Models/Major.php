<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Major extends Model
{
    protected $fillable = [
        'faculty_id',
        'kode_prodi',
        'nama_prodi',
        'jenjang',
        'kaprodi',
        'gelar',
        'akreditasi',
        'kuota_mahasiswa',
        'status_aktif',
    ];

    protected $casts = [
        'kuota_mahasiswa' => 'integer',
        'status_aktif' => 'boolean',
    ];

    /**
     * Get the faculty that owns the major.
     */
    public function faculty(): BelongsTo
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * Get the students for the major.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class , 'prodi_id');
    }

    /**
     * Get the courses for the major.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class , 'prodi_id');
    }
}