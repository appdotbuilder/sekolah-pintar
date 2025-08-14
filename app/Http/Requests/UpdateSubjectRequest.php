<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->isAdmin() || 
               (auth()->user()->isTeacher() && $this->route('subject')->teacher_id === auth()->id());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $subject = $this->route('subject');
        
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'required|string|max:20|unique:subjects,code,' . $subject->id,
            'teacher_id' => 'required|exists:users,id',
            'is_active' => 'boolean',
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
            'name.required' => 'Nama mata pelajaran harus diisi.',
            'code.required' => 'Kode mata pelajaran harus diisi.',
            'code.unique' => 'Kode mata pelajaran sudah digunakan.',
            'teacher_id.required' => 'Guru harus dipilih.',
            'teacher_id.exists' => 'Guru yang dipilih tidak valid.',
        ];
    }
}