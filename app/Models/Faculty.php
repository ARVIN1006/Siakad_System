<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Faculty extends Model
{
    protected $fillable = [
        'kode_fakultas',
        'nama_fakultas',
        'deskripsi',
        'dekan',
        'tahun_berdiri',
        'akreditasi',
        'status_aktif',
    ];

    protected $casts = [
        'status_aktif' => 'boolean',
        'tahun_berdiri' => 'integer',
    ];

    /**
     * Get the majors for the faculty.
     */
    public function majors(): HasMany
    {
        return $this->hasMany(Major::class);
    }
}