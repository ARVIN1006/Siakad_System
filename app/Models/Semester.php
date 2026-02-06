<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    protected $fillable = [
        'nama_semester',
        'tahun_ajaran',
        'jenis',
        'status_aktif',
        'tanggal_mulai',
        'tanggal_selesai',
    ];

    protected $casts = [
        'status_aktif' => 'boolean',
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    /**
     * Get the KRS for the semester.
     */
    public function krs(): HasMany
    {
        return $this->hasMany(StudentKrs::class);
    }

    /**
     * Get the classes for the semester.
     */
    public function classes(): HasMany
    {
        return $this->hasMany(ClassModel::class);
    }

    /**
     * Get the tuition fees for the semester.
     */
    public function tuitionFees(): HasMany
    {
        return $this->hasMany(TuitionFee::class);
    }
}