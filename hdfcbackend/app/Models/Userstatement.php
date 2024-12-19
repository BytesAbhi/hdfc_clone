<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Userstatement extends Model
{
    protected $table = 'userstatements';

    protected $fillable = [
        'user_id',        
        'date',
        'description',
        'ref_num',
        'amount',
        'balance',
    ];

    protected $dates = ['date'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
