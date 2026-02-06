<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentGrade extends Model
{
    protected $fillable = [
        'mahasiswa_id',
        'kelas_id',
        'semester_id',
        'tugas',
        'kuis',
        'uts',
        'uas',
        'kehadiran',
        'nilai_akhir',
        'huruf_mutu',
        'angka_mutu',
    ];

    protected $casts = [
        'tugas' => 'decimal:2',
        'kuis' => 'decimal:2',
        'uts' => 'decimal:2',
        'uas' => 'decimal:2',
        'kehadiran' => 'integer',
        'nilai_akhir' => 'decimal:2',
        'angka_mutu' => 'decimal:2',
    ];

    /**
     * Get the student that owns the grade.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'mahasiswa_id');
    }

    /**
     * Get the class for the grade.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(ClassModel::class , 'kelas_id');
    }

    /**
     * Get the semester for the grade.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }
}