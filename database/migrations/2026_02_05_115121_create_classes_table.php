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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->foreignId('mata_kuliah_id')->constrained('courses')->onDelete('cascade');
            $table->foreignId('dosen_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('nama_kelas', 10); // e.g., A, B, C
            $table->integer('kuota')->default(40);
            $table->integer('jumlah_mahasiswa')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};