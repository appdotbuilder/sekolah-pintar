<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Models\Exam;
use App\Models\Subject;
use App\Models\StudentExamResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isStudent()) {
            // Get exams from enrolled subjects
            $exams = Exam::with(['subject.teacher'])
                ->whereHas('subject.students', function($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->published()
                ->latest()
                ->paginate(10);
        } elseif ($user->isTeacher()) {
            // Get exams from teaching subjects
            $exams = Exam::with(['subject'])
                ->whereHas('subject', function($query) use ($user) {
                    $query->where('teacher_id', $user->id);
                })
                ->latest()
                ->paginate(10);
        } else {
            // Admin can see all exams
            $exams = Exam::with(['subject.teacher'])
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('exams/index', [
            'exams' => $exams,
            'canCreate' => $user->isAdmin() || $user->isTeacher()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        
        if ($user->isTeacher()) {
            $subjects = Subject::where('teacher_id', $user->id)->get(['id', 'name']);
        } else {
            $subjects = Subject::all(['id', 'name']);
        }

        return Inertia::render('exams/create', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        $exam = Exam::create($request->validated());

        return redirect()->route('exams.show', $exam)
            ->with('success', 'Ujian berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        $exam->load(['subject.teacher', 'questions']);
        
        $user = auth()->user();
        $canTake = false;
        $hasResult = false;
        $result = null;

        if ($user->isStudent()) {
            $canTake = $exam->subject->students->contains($user->id) && $exam->is_published;
            $result = StudentExamResult::where('student_id', $user->id)
                ->where('exam_id', $exam->id)
                ->first();
            $hasResult = $result !== null;
        }

        return Inertia::render('exams/show', [
            'exam' => $exam,
            'canTake' => $canTake,
            'hasResult' => $hasResult,
            'result' => $result,
            'canManage' => $user->isAdmin() || ($user->isTeacher() && $exam->subject->teacher_id === $user->id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        $user = auth()->user();
        
        if ($user->isTeacher()) {
            $subjects = Subject::where('teacher_id', $user->id)->get(['id', 'name']);
        } else {
            $subjects = Subject::all(['id', 'name']);
        }

        return Inertia::render('exams/edit', [
            'exam' => $exam,
            'subjects' => $subjects
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $exam->update($request->validated());

        return redirect()->route('exams.show', $exam)
            ->with('success', 'Ujian berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();

        return redirect()->route('exams.index')
            ->with('success', 'Ujian berhasil dihapus.');
    }
}