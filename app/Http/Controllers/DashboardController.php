<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\User;
use App\Models\Exam;
use App\Models\StudentExamResult;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $stats = [];
        $recentActivities = [];

        if ($user->isAdmin()) {
            $stats = [
                'total_students' => User::students()->where('is_active', true)->count(),
                'total_teachers' => User::teachers()->where('is_active', true)->count(),
                'total_subjects' => Subject::active()->count(),
                'total_exams' => Exam::published()->count(),
            ];
            
            $recentActivities = [
                'recent_subjects' => Subject::with('teacher')->latest()->take(5)->get(),
                'recent_exams' => Exam::with('subject')->latest()->take(5)->get(),
            ];
        } elseif ($user->isTeacher()) {
            $stats = [
                'my_subjects' => Subject::where('teacher_id', $user->id)->active()->count(),
                'total_students' => Subject::where('teacher_id', $user->id)->withCount('students')->get()->sum('students_count'),
                'my_exams' => Exam::whereHas('subject', function($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })->count(),
                'pending_results' => StudentExamResult::whereHas('exam.subject', function($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })->whereNull('completed_at')->count(),
            ];
            
            $recentActivities = [
                'my_subjects' => Subject::where('teacher_id', $user->id)->with('students')->latest()->take(3)->get(),
                'recent_exams' => Exam::whereHas('subject', function($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })->with('subject')->latest()->take(5)->get(),
            ];
        } else { // Student
            $stats = [
                'enrolled_subjects' => $user->enrolledSubjects()->wherePivot('is_active', true)->count(),
                'available_exams' => Exam::whereHas('subject.students', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->published()->count(),
                'completed_exams' => StudentExamResult::where('student_id', $user->id)->whereNotNull('completed_at')->count(),
                'average_score' => StudentExamResult::where('student_id', $user->id)->whereNotNull('completed_at')->avg('percentage') ?? 0,
            ];
            
            $recentActivities = [
                'enrolled_subjects' => $user->enrolledSubjects()->with('teacher')->take(5)->get(),
                'recent_results' => StudentExamResult::where('student_id', $user->id)
                    ->with('exam.subject')
                    ->whereNotNull('completed_at')
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'user' => $user
        ]);
    }
}