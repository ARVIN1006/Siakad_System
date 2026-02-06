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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prodi_id')->constrained('majors')->onDelete('cascade');
            $table->string('kode_mk', 20)->unique();
            $table->string('nama_mk');
            $table->integer('sks');
            $table->integer('semester_ditawarkan'); // Recommended semester (1-8)
            $table->enum('jenis_mk', ['Wajib', 'Pilihan'])->default('Wajib');
            $table->text('deskripsi')->nullable();
            $table->text('capaian_pembelajaran')->nullable();
            $table->foreignId('prasyarat_id')->nullable()->constrained('courses')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};