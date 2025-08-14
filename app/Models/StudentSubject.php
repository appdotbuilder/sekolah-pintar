<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentSubject
 *
 * @property int $id
 * @property int $student_id
 * @property int $subject_id
 * @property \Illuminate\Support\Carbon $enrolled_at
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $student
 * @property-read Subject $subject
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereEnrolledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentSubject active()

 * 
 * @mixin \Eloquent
 */
class StudentSubject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'subject_id',
        'enrolled_at',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'enrolled_at' => 'datetime',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the enrollment.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the subject that owns the enrollment.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Scope a query to only include active enrollments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}