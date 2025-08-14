<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ExamQuestion
 *
 * @property int $id
 * @property int $exam_id
 * @property string $question
 * @property array $options
 * @property string $correct_answer
 * @property int $points
 * @property int $order
 * @property bool $has_text_field
 * @property string|null $text_field_label
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Exam $exam
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereCorrectAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereExamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereHasTextField($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereTextFieldLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExamQuestion whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class ExamQuestion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'exam_id',
        'question',
        'options',
        'correct_answer',
        'points',
        'order',
        'has_text_field',
        'text_field_label',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'options' => 'array',
        'points' => 'integer',
        'order' => 'integer',
        'has_text_field' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the exam that owns the question.
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }
}