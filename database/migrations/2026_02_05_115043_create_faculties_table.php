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
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('kode_fakultas', 20)->unique();
            $table->string('nama_fakultas');
            $table->text('deskripsi')->nullable();
            $table->string('dekan')->nullable();
            $table->year('tahun_berdiri')->nullable();
            $table->enum('akreditasi', ['A', 'B', 'C', 'Unggul', 'Baik Sekali', 'Baik'])->nullable();
            $table->boolean('status_aktif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faculties');
    }
};