<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Exam
 *
 * @property int $id
 * @property int $subject_id
 * @property string $title
 * @property string|null $description
 * @property int $duration_minutes
 * @property \Illuminate\Support\Carbon|null $start_time
 * @property \Illuminate\Support\Carbon|null $end_time
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Subject $subject
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ExamQuestion> $questions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, StudentExamResult> $results
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Exam newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exam newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Exam query()
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Exam published()

 * 
 * @mixin \Eloquent
 */
class Exam extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'subject_id',
        'title',
        'description',
        'duration_minutes',
        'start_time',
        'end_time',
        'is_published',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_published' => 'boolean',
        'duration_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the subject that owns the exam.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the questions for the exam.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(ExamQuestion::class)->orderBy('order');
    }

    /**
     * Get the results for the exam.
     */
    public function results(): HasMany
    {
        return $this->hasMany(StudentExamResult::class);
    }

    /**
     * Scope a query to only include published exams.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}