<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = ['title', 'description', 'release_year', 'duration', 'category_id', 'media_id'];

    public function categories()
    {
        return $this->morphToMany(Category::class, 'movie_show');
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

    public function watchlistUsers()
    {
        return $this->belongsToMany(User::class, 'watchlist');
    }
}
