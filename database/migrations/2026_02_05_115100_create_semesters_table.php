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
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->string('nama_semester'); // e.g., 2023/2024 Ganjil
            $table->string('tahun_ajaran', 20); // e.g., 2023/2024
            $table->enum('jenis', ['Ganjil', 'Genap', 'Pendek'])->default('Ganjil');
            $table->boolean('status_aktif')->default(false);
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semesters');
    }
};