<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'prodi_id',
        'kode_mk',
        'nama_mk',
        'sks',
        'semester_ditawarkan',
        'jenis_mk',
        'deskripsi',
        'capaian_pembelajaran',
        'prasyarat_id',
    ];

    protected $casts = [
        'sks' => 'integer',
        'semester_ditawarkan' => 'integer',
    ];

    /**
     * Get the major that owns the course.
     */
    public function major(): BelongsTo
    {
        return $this->belongsTo(Major::class , 'prodi_id');
    }

    /**
     * Get the prerequisite course.
     */
    public function prerequisite(): BelongsTo
    {
        return $this->belongsTo(Course::class , 'prasyarat_id');
    }

    /**
     * Get the courses that have this as prerequisite.
     */
    public function dependentCourses(): HasMany
    {
        return $this->hasMany(Course::class , 'prasyarat_id');
    }

    /**
     * Get the classes for the course.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassModel::class , 'mata_kuliah_id');
    }
}