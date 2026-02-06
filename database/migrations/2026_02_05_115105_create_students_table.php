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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('prodi_id')->constrained('majors')->onDelete('cascade');
            $table->string('nim', 20)->unique();
            $table->string('nama_lengkap');
            $table->enum('status', ['aktif', 'cuti', 'lulus', 'keluar', 'dropout'])->default('aktif');
            $table->text('alamat')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->enum('jenis_kelamin', ['L', 'P'])->nullable();
            $table->enum('agama', ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'])->nullable();
            $table->string('no_hp', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('foto')->nullable();
            $table->string('kewarganegaraan', 50)->default('Indonesia');
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O'])->nullable();
            $table->string('nama_orang_tua')->nullable();
            $table->string('no_hp_orang_tua', 20)->nullable();
            $table->year('angkatan');
            $table->decimal('ipk', 3, 2)->default(0.00);
            $table->integer('total_sks')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};