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
        Schema::create('majors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculties')->onDelete('cascade');
            $table->string('kode_prodi', 20)->unique();
            $table->string('nama_prodi');
            $table->enum('jenjang', ['D3', 'D4', 'S1', 'S2', 'S3'])->default('S1');
            $table->string('kaprodi')->nullable();
            $table->string('gelar', 50)->nullable(); // S.Kom, S.T, dll
            $table->enum('akreditasi', ['A', 'B', 'C', 'Unggul', 'Baik Sekali', 'Baik'])->nullable();
            $table->integer('kuota_mahasiswa')->default(40);
            $table->boolean('status_aktif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('majors');
    }
};