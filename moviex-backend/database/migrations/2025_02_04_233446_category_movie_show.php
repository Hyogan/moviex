<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_movie_show', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained();
            $table->morphs('movie_show'); // This will create `movie_show_id` and `movie_show_type`
            $table->enum('type', ['movie', 'show']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
