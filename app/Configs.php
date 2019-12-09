<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Configs extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'cn', 'acname', 'acnum', 'balance', 'status'
    ];
}
