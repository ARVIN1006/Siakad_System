<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'biaya_kuliah_id',
        'jumlah',
        'metode_pembayaran',
        'id_transaksi',
        'bukti_pembayaran',
        'tanggal_bayar',
        'validasi_oleh',
        'tanggal_validasi',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'tanggal_bayar' => 'datetime',
        'tanggal_validasi' => 'datetime',
    ];

    /**
     * Get the tuition fee that owns the payment.
     */
    public function tuitionFee(): BelongsTo
    {
        return $this->belongsTo(TuitionFee::class , 'biaya_kuliah_id');
    }

    /**
     * Get the user who validated the payment.
     */
    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class , 'validasi_oleh');
    }
}