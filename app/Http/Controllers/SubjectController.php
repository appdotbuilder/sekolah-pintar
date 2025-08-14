<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isTeacher()) {
            $subjects = Subject::with(['teacher', 'students'])
                ->where('teacher_id', $user->id)
                ->latest()
                ->paginate(10);
        } else {
            $subjects = Subject::with(['teacher', 'students'])
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('subjects/index', [
            'subjects' => $subjects,
            'canCreate' => $user->isAdmin() || $user->isTeacher()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = User::teachers()->where('is_active', true)->get(['id', 'name']);

        return Inertia::render('subjects/create', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {
        $data = $request->validated();
        
        // If teacher is creating, set themselves as teacher
        if (auth()->user()->isTeacher()) {
            $data['teacher_id'] = auth()->id();
        }

        $subject = Subject::create($data);

        return redirect()->route('subjects.show', $subject)
            ->with('success', 'Mata pelajaran berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        $subject->load(['teacher', 'students', 'schedules', 'materials' => function($query) {
            $query->published()->orderBy('order');
        }, 'exams' => function($query) {
            $query->published()->latest();
        }]);

        $user = auth()->user();
        $isEnrolled = $user->isStudent() && $subject->students->contains($user->id);

        return Inertia::render('subjects/show', [
            'subject' => $subject,
            'isEnrolled' => $isEnrolled,
            'canManage' => $user->isAdmin() || ($user->isTeacher() && $subject->teacher_id === $user->id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        $teachers = User::teachers()->where('is_active', true)->get(['id', 'name']);

        return Inertia::render('subjects/edit', [
            'subject' => $subject,
            'teachers' => $teachers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $subject->update($request->validated());

        return redirect()->route('subjects.show', $subject)
            ->with('success', 'Mata pelajaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();

        return redirect()->route('subjects.index')
            ->with('success', 'Mata pelajaran berhasil dihapus.');
    }
}