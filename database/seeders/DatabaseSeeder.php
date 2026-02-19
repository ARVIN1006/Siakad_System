<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class, 
            FacultySeeder::class,
            SemesterSeeder::class,
            UserSeeder::class,
            CourseSeeder::class,
            ClassSeeder::class,
            TuitionSeeder::class,
            KrsSeeder::class,
        ]);
    }
}