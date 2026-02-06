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
        Schema::create('tuition_fees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mahasiswa_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->enum('jenis_biaya', ['SPP', 'UKT', 'Biaya Lab', 'Biaya Wisuda', 'Lainnya'])->default('UKT');
            $table->decimal('jumlah', 15, 2);
            $table->decimal('potongan', 15, 2)->default(0); // Scholarship/discount
            $table->decimal('total', 15, 2); // jumlah - potongan
            $table->enum('status', ['belum_bayar', 'dibayar_sebagian', 'lunas'])->default('belum_bayar');
            $table->string('nomor_va')->nullable();
            $table->date('jatuh_tempo')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tuition_fees');
    }
};