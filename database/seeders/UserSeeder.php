<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create Admin
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@eduplatform.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create Teachers
        User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@eduplatform.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '08123456789',
            'address' => 'Jakarta Selatan',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Siti Nurhaliza',
            'email' => 'siti@eduplatform.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '08234567890',
            'address' => 'Bandung',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Ahmad Wijaya',
            'email' => 'ahmad@eduplatform.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '08345678901',
            'address' => 'Surabaya',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create Students
        $students = [
            ['name' => 'Andi Pratama', 'email' => 'andi@student.com', 'student_id' => 'STD001'],
            ['name' => 'Rina Sari', 'email' => 'rina@student.com', 'student_id' => 'STD002'],
            ['name' => 'Doni Hermawan', 'email' => 'doni@student.com', 'student_id' => 'STD003'],
            ['name' => 'Maya Putri', 'email' => 'maya@student.com', 'student_id' => 'STD004'],
            ['name' => 'Reza Fadli', 'email' => 'reza@student.com', 'student_id' => 'STD005'],
            ['name' => 'Indira Sari', 'email' => 'indira@student.com', 'student_id' => 'STD006'],
            ['name' => 'Bayu Pratama', 'email' => 'bayu@student.com', 'student_id' => 'STD007'],
            ['name' => 'Citra Dewi', 'email' => 'citra@student.com', 'student_id' => 'STD008'],
        ];

        foreach ($students as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'student_id' => $student['student_id'],
                'is_active' => true,
                'email_verified_at' => now(),
            ]);
        }
    }
}