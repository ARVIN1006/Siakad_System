<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TuitionFee extends Model
{
    protected $fillable = [
        'mahasiswa_id',
        'semester_id',
        'jenis_biaya',
        'jumlah',
        'potongan',
        'total',
        'status',
        'nomor_va',
        'jatuh_tempo',
        'keterangan',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'potongan' => 'decimal:2',
        'total' => 'decimal:2',
        'jatuh_tempo' => 'date',
    ];

    /**
     * Get the student that owns the tuition fee.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class , 'mahasiswa_id');
    }

    /**
     * Get the semester for the tuition fee.
     */
    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    /**
     * Get the payments for the tuition fee.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class , 'biaya_kuliah_id');
    }
}