<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $exam = $this->route('exam');
        return auth()->user()->isAdmin() || 
               (auth()->user()->isTeacher() && $exam->subject->teacher_id === auth()->id());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subject_id' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1|max:300',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'is_published' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'subject_id.required' => 'Mata pelajaran harus dipilih.',
            'subject_id.exists' => 'Mata pelajaran yang dipilih tidak valid.',
            'title.required' => 'Judul ujian harus diisi.',
            'duration_minutes.required' => 'Durasi ujian harus diisi.',
            'duration_minutes.min' => 'Durasi ujian minimal 1 menit.',
            'duration_minutes.max' => 'Durasi ujian maksimal 300 menit (5 jam).',
            'end_time.after' => 'Waktu selesai harus setelah waktu mulai.',
        ];
    }
}