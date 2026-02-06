<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentKrs extends Model
{
    protected $table = 'student_krs';

    protected $fillable = [
        'mahasiswa_id',
        'semester_id',
        'status',
        'total_sks',
        'batas_ips',
        'catatan_pembimbing',
        'disetujui_oleh',
        'tanggal_disetujui',
    ];

    protected $casts = [
        'total_sks' => 'integer',
        'batas_ips' => 'decimal:2',
        'tanggal_disetujui' => 'datetime',
    ];

    /**
     * Get the student that owns the KRS.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'mahasiswa_id');
    }

    /**
     * Get the semester for the KRS.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    /**
     * Get the lecturer who approved the KRS.
     */
    public function approver(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class , 'disetujui_oleh');
    }

    /**
     * Get the KRS details.
     */
    public function details(): HasMany
    {
        return $this->hasMany(KrsDetail::class , 'krs_id');
    }
}