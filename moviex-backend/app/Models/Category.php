<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function moviesAndShows()
    {
        return $this->morphToMany(Movie::class, 'movie_show');
    }

    // public function movies()
    // {
    //     return $this->belongsToMany(Movie::class, 'category_movie_show')->withPivot('type');
    // }

    // public function shows()
    // {
    //     return $this->belongsToMany(Show::class, 'category_movie_show')->withPivot('type');
    // }
}
