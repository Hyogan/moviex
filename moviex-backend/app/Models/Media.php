<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['file_path', 'file_size', 'type'];

    public function movies()
    {
        return $this->hasOne(Movie::class);
    }

    public function episodes()
    {
        return $this->hasOne(Episode::class);
    }
}
