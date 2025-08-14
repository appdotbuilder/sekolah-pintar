<?php

namespace Database\Seeders;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $teachers = User::teachers()->get();
        
        $subjects = [
            [
                'name' => 'Matematika Kelas X',
                'description' => 'Mata pelajaran matematika untuk siswa kelas X semester 1 dan 2. Meliputi aljabar, geometri, dan trigonometri dasar.',
                'code' => 'MTK-X-01',
                'teacher_id' => $teachers[0]->id,
            ],
            [
                'name' => 'Bahasa Indonesia',
                'description' => 'Mata pelajaran bahasa Indonesia yang mencakup tata bahasa, sastra, dan kemampuan menulis untuk siswa SMA.',
                'code' => 'BIN-01',
                'teacher_id' => $teachers[1]->id,
            ],
            [
                'name' => 'Fisika Dasar',
                'description' => 'Konsep-konsep dasar fisika meliputi mekanika, termodinamika, dan gelombang untuk siswa tingkat menengah.',
                'code' => 'FIS-01',
                'teacher_id' => $teachers[2]->id,
            ],
            [
                'name' => 'Sejarah Indonesia',
                'description' => 'Sejarah perjalanan bangsa Indonesia dari masa pra-kemerdekaan hingga era reformasi.',
                'code' => 'SEJ-01',
                'teacher_id' => $teachers[0]->id,
            ],
            [
                'name' => 'Biologi Umum',
                'description' => 'Mata pelajaran biologi yang membahas tentang kehidupan, sel, genetika, dan ekosistem.',
                'code' => 'BIO-01',
                'teacher_id' => $teachers[1]->id,
            ],
        ];

        foreach ($subjects as $subjectData) {
            Subject::create($subjectData);
        }
    }
}