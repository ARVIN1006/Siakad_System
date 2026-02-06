<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('biaya_kuliah_id')->constrained('tuition_fees')->onDelete('cascade');
            $table->decimal('jumlah', 15, 2);
            $table->string('metode_pembayaran')->nullable(); // Transfer, VA, dll
            $table->string('id_transaksi')->nullable();
            $table->string('bukti_pembayaran')->nullable(); // Path to file
            $table->timestamp('tanggal_bayar');
            $table->foreignId('validasi_oleh')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('tanggal_validasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};