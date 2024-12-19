<?php

namespace App\Http\Controllers;

use App\Models\Userdetails;
use Illuminate\Http\Request;

class Userdetailscontroller extends Controller
{
    public function index()
    {
        $userdetails = Userdetails::all();
        return response()->json($userdetails);
    }

    // Store new user details
    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_holders' => 'nullable|string',
            'nominee' => 'nullable|string',
            'branch' => 'nullable|string',
            'ifsc' => 'nullable|string',
            'mmid' => 'nullable|string',
            'virtual_payment_address' => 'nullable|string',
            'account_balance' => 'nullable|string',
            'required_monthly_average_balance' => 'nullable|string',
            'uncleared_funds' => 'nullable|string',
            'amount_on_hold' => 'nullable|string',
            'linked_cards' => 'nullable|json',
            'spending_limit' => 'nullable|string',
        ]);

        $userdetail = Userdetails::create($validated);
        return response()->json($userdetail, 201);
    }

    // Show specific user details
    public function show($id)
    {
        $userdetail = Userdetails::findOrFail($id);
        return response()->json($userdetail);
    }

    // Update user details
    public function update(Request $request, $id)
    {
        $userdetail = Userdetails::findOrFail($id);

        $validated = $request->validate([
            'account_holders' => 'nullable|string',
            'nominee' => 'nullable|string',
            'branch' => 'nullable|string',
            'ifsc' => 'nullable|string',
            'mmid' => 'nullable|string',
            'virtual_payment_address' => 'nullable|string',
            'account_balance' => 'nullable|string',
            'required_monthly_average_balance' => 'nullable|string',
            'uncleared_funds' => 'nullable|string',
            'amount_on_hold' => 'nullable|string',
            'linked_cards' => 'nullable|json',
            'spending_limit' => 'nullable|string',
        ]);

        $userdetail->update($validated);
        return response()->json($userdetail);
    }

    // Delete user details
    public function destroy($id)
    {
        $userdetail = Userdetails::findOrFail($id);
        $userdetail->delete();
        return response()->json(['message' => 'User detail deleted successfully']);
    }
}
