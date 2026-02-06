<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KrsDetail extends Model
{
    protected $fillable = [
        'krs_id',
        'kelas_id',
    ];

    /**
     * Get the KRS that owns the detail.
     */
    public function krs(): BelongsTo
    {
        return $this->belongsTo(StudentKrs::class , 'krs_id');
    }

    /**
     * Get the class for the KRS detail.
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(ClassModel::class , 'kelas_id');
    }
}