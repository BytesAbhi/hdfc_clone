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
        Schema::create('userdetails', function (Blueprint $table) {
            $table->id();

            // Account-related fields
            $table->string('account_holders')->nullable();
            $table->string('nominee')->nullable();
            $table->string('branch')->nullable();
            $table->string('ifsc')->nullable();
            $table->string('mmid')->nullable();
            $table->string('virtual_payment_address')->nullable();
            $table->string('account_balance')->nullable();
            $table->string('required_monthly_average_balance')->nullable();
            $table->string('uncleared_funds')->nullable();
            $table->string('amount_on_hold')->nullable();
            $table->json('linked_cards')->nullable();
            $table->string('spending_limit')->nullable();

            // Address-related fields
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();

            // Contact and financial fields
            $table->string('phone_number')->nullable();
            $table->string('od_limit')->nullable();
            $table->string('currency')->nullable();
            $table->string('email')->nullable();

            // Account-specific identifiers
            $table->string('customer_id')->nullable();
            $table->string('account_no')->nullable();
            $table->date('account_open_date')->nullable();
            $table->string('account_status')->nullable();

            // Financial identifiers
            $table->string('rtgs_neft_ifsc')->nullable();
            $table->string('micr')->nullable();
            $table->string('branch_code')->nullable();
            $table->string('product_code')->nullable();

            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userdetails');
    }
};
