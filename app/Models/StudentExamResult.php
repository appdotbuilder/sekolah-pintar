<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentExamResult
 *
 * @property int $id
 * @property int $student_id
 * @property int $exam_id
 * @property array $answers
 * @property int $score
 * @property int $total_points
 * @property float $percentage
 * @property \Illuminate\Support\Carbon $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $student
 * @property-read Exam $exam
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereExamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult wherePercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereTotalPoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentExamResult whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class StudentExamResult extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'exam_id',
        'answers',
        'score',
        'total_points',
        'percentage',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
        'score' => 'integer',
        'total_points' => 'integer',
        'percentage' => 'decimal:2',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student that owns the result.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the exam that owns the result.
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }
}