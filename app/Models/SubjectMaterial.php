<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\SubjectMaterial
 *
 * @property int $id
 * @property int $subject_id
 * @property string $title
 * @property string|null $content
 * @property string $type
 * @property string|null $file_path
 * @property int $order
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Subject $subject
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubjectMaterial published()

 * 
 * @mixin \Eloquent
 */
class SubjectMaterial extends Model
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
        'content',
        'type',
        'file_path',
        'order',
        'is_published',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_published' => 'boolean',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the subject that owns the material.
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Scope a query to only include published materials.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}