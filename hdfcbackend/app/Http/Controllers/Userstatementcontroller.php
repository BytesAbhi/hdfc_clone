<?php

namespace App\Http\Controllers;

use App\Models\Userstatement;
use Illuminate\Http\Request;
use App\Models\User;

class UserstatementController extends Controller
{
    // Store a new user statement
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Ensure the user_id exists in the users table
            'date' => 'required|date',
            'description' => 'required|string',
            'ref_num' => 'required|string',
            'amount' => 'required|numeric|min:0', // Ensure the amount is a positive number
            'balance' => 'required|numeric|min:0', // Ensure balance is a positive number
        ]);

        // Optionally, check if the user exists or has permissions (if needed)
        $user = User::findOrFail($validated['user_id']);

        // Create the user statement
        $userstatement = Userstatement::create($validated);

        // Return the response
        return response()->json([
            'message' => 'User statement created successfully',
            'data' => $userstatement
        ], 201);
    }

    // Get all user statements
    public function index(Request $request)
    {
        // Optional: Add filtering, pagination, or other query logic
        $userstatements = Userstatement::paginate(10); // Paginate results for better performance

        return response()->json($userstatements);
    }

    // Show specific user statement
    public function show($id)
    {
        $userstatement = Userstatement::findOrFail($id);
        return response()->json($userstatement);
    }
}
