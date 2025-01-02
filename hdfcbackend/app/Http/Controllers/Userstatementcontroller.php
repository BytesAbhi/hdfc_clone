<?php

namespace App\Http\Controllers;

use App\Models\Userstatement;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

class UserstatementController extends Controller
{
    /**
     * Store a new user statement.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'description' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'transaction_type' => 'required|in:Credit,Debit',
        ]);

        // Fetch the user
        $user = User::findOrFail($validated['user_id']);

        // Auto-generate a 12-digit reference number
        $validated['ref_num'] = Str::padLeft(mt_rand(1, 999999999999), 12, '0');

        // Update balance based on transaction type
        if ($validated['transaction_type'] === 'Credit') {
            $newBalance = $user->account_balance + $validated['amount'];
        } elseif ($validated['transaction_type'] === 'Debit') {
            // Ensure sufficient balance for Debit transactions
            if ($user->account_balance < $validated['amount']) {
                return response()->json([
                    'message' => 'Insufficient balance for this transaction.',
                ], 400);
            }
            $newBalance = $user->account_balance - $validated['amount'];
        }

        // Save the updated balance to the user
        $user->account_balance = $newBalance;
        $user->save();

        // Create the user statement
        $validated['balance'] = $newBalance; // Include the updated balance
        $userstatement = Userstatement::create($validated);

        return response()->json([
            'message' => 'User statement created successfully.',
            'data' => $userstatement,
        ], 201);
    }

    /**
     * Retrieve paginated list of user statements.
     */
    public function index(Request $request)
    {
        $userstatements = Userstatement::paginate(10);

        return response()->json($userstatements);
    }

    /**
     * Retrieve a specific user statement.
     */
    public function show($id)
    {
        $userstatement = Userstatement::findOrFail($id);

        return response()->json($userstatement);
    }
}
