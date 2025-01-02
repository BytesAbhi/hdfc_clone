<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Userdetails extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'userdetails';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'account_holders',
        'nominee',
        'branch',
        'ifsc',
        'mmid',
        'virtual_payment_address',
        'account_balance',
        'required_monthly_average_balance',
        'uncleared_funds',
        'amount_on_hold',
        'linked_cards',
        'spending_limit',
        'address',
        'city',
        'state',
        'phone_number',
        'od_limit',
        'currency',
        'email',
        'customer_id',
        'account_no',
        'account_open_date',
        'account_status',
        'rtgs_neft_ifsc',
        'micr',
        'branch_code',
        'product_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'linked_cards' => 'array',
    ];
}
