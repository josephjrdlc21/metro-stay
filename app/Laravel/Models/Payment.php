<?php

namespace App\Laravel\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Payment extends Model{
    
    use SoftDeletes;

    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "payments";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
    /**
     * The attributes that created within the model.
     *
     * @var array
     */
    protected $appends = [];
    
    protected $dates = [];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    public function booking(): BelongsTo {
        return $this->belongsTo('App\Laravel\Models\Booking', 'booking_id', 'id');
    }
}