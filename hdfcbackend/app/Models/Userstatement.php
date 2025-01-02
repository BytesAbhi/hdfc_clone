<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Userstatement extends Model
{
    protected $table = 'userstatements';

    protected $fillable = [
        'user_id',        
        'date',
        'description',
        'ref_num',
        'amount',
        'transaction_type',
        'balance',
    ];

    protected $dates = ['date'];

    /**
     * Relationship with User model
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Boot method to handle model events
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically generate the ref_num before saving
        static::creating(function ($statement) {
            // Generate a unique 12-digit reference number
            $statement->ref_num = Str::padLeft(mt_rand(1, 999999999999), 12, '0');

            // Update the balance for the associated user
            $user = $statement->user;

            if ($user) {
                if ($statement->transaction_type === 'Credit') {
                    $statement->balance = $user->account_balance + $statement->amount;
                    $user->account_balance += $statement->amount;
                } elseif ($statement->transaction_type === 'Debit') {
                    $statement->balance = $user->account_balance - $statement->amount;
                    $user->account_balance -= $statement->amount;
                }

                // Save the updated balance to the user
                $user->save();
            }
        });
    }
}
