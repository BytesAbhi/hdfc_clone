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
