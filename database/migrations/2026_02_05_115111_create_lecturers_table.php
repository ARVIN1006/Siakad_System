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
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nidn', 20)->unique();
            $table->string('nip', 30)->unique()->nullable();
            $table->string('nama_lengkap');
            $table->string('gelar_depan', 20)->nullable();
            $table->string('gelar_belakang', 50)->nullable();
            $table->string('email')->unique();
            $table->string('no_hp', 20)->nullable();
            $table->text('alamat')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])->nullable();
            $table->enum('jenjang_pendidikan', ['S1', 'S2', 'S3'])->default('S2');
            $table->string('jabatan')->nullable(); // Asisten Ahli, Lektor, dll
            $table->enum('status_kepegawaian', ['PNS', 'Dosen Tetap', 'Dosen Kontrak', 'Dosen Luar Biasa'])->default('Dosen Tetap');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};