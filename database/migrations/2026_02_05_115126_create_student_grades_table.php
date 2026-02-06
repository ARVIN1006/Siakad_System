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
        Schema::create('student_grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mahasiswa_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('kelas_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->decimal('tugas', 5, 2)->nullable();
            $table->decimal('kuis', 5, 2)->nullable();
            $table->decimal('uts', 5, 2)->nullable();
            $table->decimal('uas', 5, 2)->nullable();
            $table->integer('kehadiran')->default(0); // Persentase kehadiran 0-100
            $table->decimal('nilai_akhir', 5, 2)->nullable();
            $table->enum('huruf_mutu', ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'])->nullable();
            $table->decimal('angka_mutu', 3, 2)->nullable(); // 4.00, 3.75, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_grades');
    }
};