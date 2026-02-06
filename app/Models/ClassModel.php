<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ClassModel extends Model
{
    protected $table = 'classes';

    protected $fillable = [
        'semester_id',
        'mata_kuliah_id',
        'dosen_id',
        'nama_kelas',
        'kuota',
        'jumlah_mahasiswa',
    ];

    protected $casts = [
        'kuota' => 'integer',
        'jumlah_mahasiswa' => 'integer',
    ];

    /**
     * Get the semester that owns the class.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    /**
     * Get the course for the class.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class , 'mata_kuliah_id');
    }

    /**
     * Get the lecturer for the class.
     */
    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class , 'dosen_id');
    }

    /**
     * Get the schedules for the class.
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class , 'kelas_id');
    }

    /**
     * Get the grades for the class.
     */
    public function grades(): HasMany
    {
        return $this->hasMany(StudentGrade::class , 'kelas_id');
    }

    /**
     * Get the KRS details for the class.
     */
    public function krsDetails(): HasMany
    {
        return $this->hasMany(KrsDetail::class , 'kelas_id');
    }

    /**
     * Get the students enrolled in the class through KRS.
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class , 'krs_details', 'kelas_id', 'krs_id')
            ->through(StudentKrs::class);
    }
}