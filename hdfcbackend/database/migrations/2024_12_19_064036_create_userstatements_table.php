<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('userstatements', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('user_id'); // Foreign key for userdetails table
            $table->date('date'); // Transaction date
            $table->string('description', 255); // Transaction description
            $table->string('ref_num', 12)->unique(); // 12-digit reference number
            $table->decimal('amount', 12, 2); // Transaction amount
            $table->enum('transaction_type', ['Credit', 'Debit']); // Credit or Debit
            $table->timestamps(); // Created_at and updated_at

            // Foreign key constraint linking to userdetails table
            $table->foreign('user_id')
                  ->references('id')
                  ->on('userdetails')
                  ->onDelete('cascade'); // Cascade on delete
        });

        // Trigger for auto-generating reference number and updating userdetails balance
        DB::unprepared("
            CREATE TRIGGER update_balance_after_insert
            AFTER INSERT ON userstatements
            FOR EACH ROW
            BEGIN
                -- Update the account_balance in userdetails
                IF NEW.transaction_type = 'Credit' THEN
                    UPDATE userdetails 
                    SET account_balance = account_balance + NEW.amount 
                    WHERE id = NEW.user_id;
                ELSEIF NEW.transaction_type = 'Debit' THEN
                    UPDATE userdetails 
                    SET account_balance = account_balance - NEW.amount 
                    WHERE id = NEW.user_id;
                END IF;

                -- Ensure the reference number is 12 digits
                SET NEW.ref_num = LPAD(NEW.id, 12, '0');
            END;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the trigger first
        DB::unprepared("DROP TRIGGER IF EXISTS update_balance_after_insert");

        // Drop the userstatements table
        Schema::dropIfExists('userstatements');
    }
};
