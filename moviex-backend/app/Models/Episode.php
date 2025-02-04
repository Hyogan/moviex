<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = ['show_id', 'title', 'season', 'episode_number', 'media_id'];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function ratings()
    {
        return $this->morphMany(Rating::class, 'rateable');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
