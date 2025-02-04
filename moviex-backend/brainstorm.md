public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->string('password');
        $table->enum('role', ['admin', 'content_creator', 'viewer'])->default('viewer');
        $table->rememberToken();
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('movies', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description');
        $table->year('release_year');
        $table->integer('runtime')->nullable();
        $table->integer('duration');
        $table->foreignId('category_id')->constrained()->constrained('media');
        $table->foreignId('media_id')->nullable()->constrained(); // Links to Media
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('shows', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description');
        $table->year('release_year');
        $table->foreignId('category_id')->constrained();
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('episodes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('show_id')->constrained();
        $table->string('title');
        $table->integer('season');
        $table->integer('episode_number');
        $table->foreignId('media_id')->nullable()->constrained(); // Links to Media
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('media', function (Blueprint $table) {
        $table->id();
        $table->string('file_path');
        $table->integer('file_size');
        $table->enum('type', ['movie', 'episode']);
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('categories', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('watchlist', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->foreignId('movie_id')->constrained();
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->morphs('commentable'); // Comments can be for movies or shows
        $table->text('content');
        $table->timestamps();
    });
}


public function up()
{
    Schema::create('subscriptions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->enum('type', ['free', 'premium']);
        $table->date('start_date');
        $table->date('end_date');
        $table->timestamps();
    });
}













use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['name', 'email', 'password', 'role'];

    public function watchlist()
    {
        return $this->belongsToMany(Movie::class, 'watchlist');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}







class Movie extends Model
{
    protected $fillable = ['title', 'description', 'release_year', 'duration', 'category_id', 'media_id'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_movie_show')->withPivot('type');
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



class Show extends Model
{
    protected $fillable = ['title', 'description', 'release_year', 'category_id'];

     public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_movie_show')->withPivot('type');
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
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


class Category extends Model
{
    protected $fillable = ['name'];

    public function movies()
    {
        return $this->belongsToMany(Movie::class, 'category_movie_show')->withPivot('type');
    }

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'category_movie_show')->withPivot('type');
    }
}


class Watchlist extends Model
{
    protected $table = 'watchlist';
    protected $fillable = ['user_id', 'movie_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}


class Rating extends Model
{
    protected $fillable = ['user_id', 'rateable_id', 'rateable_type', 'rating'];

    public function rateable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

class Comment extends Model
{
    protected $fillable = ['user_id', 'commentable_id', 'commentable_type', 'content'];

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}




public function up()
{
    Schema::create('category_movie_show', function (Blueprint $table) {
        $table->id();
        $table->foreignId('category_id')->constrained();
        $table->foreignId('movie_show_id')->constrained(); // Can be movie or show
        $table->enum('type', ['movie', 'show']);
        $table->timestamps();
    });
}
