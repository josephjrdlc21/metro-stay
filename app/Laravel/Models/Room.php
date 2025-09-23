<?php

namespace App\Laravel\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Room extends Model{
    
    use SoftDeletes;

    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "rooms";
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

    public function room_type() {
        return $this->belongsTo('App\Laravel\Models\RoomType', 'room_type_id', 'id');
    }
}