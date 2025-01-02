<?php

namespace App\Http\Controllers;

use App\Models\Userdetails;
use Illuminate\Http\Request;

class UserdetailsController extends Controller
{
    /**
     * Display a listing of the user details.
     */
    public function index()
    {
        $userdetails = Userdetails::all(); // You can use pagination here if needed
        return response()->json($userdetails);
    }

    /**
     * Store a newly created user detail.
     */
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
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'od_limit' => 'nullable|string',
            'currency' => 'nullable|string',
            'email' => 'nullable|email',
            'customer_id' => 'nullable|string',
            'account_no' => 'nullable|string',
            'account_open_date' => 'nullable|date',
            'account_status' => 'nullable|string',
            'rtgs_neft_ifsc' => 'nullable|string',
            'micr' => 'nullable|string',
            'branch_code' => 'nullable|string',
            'product_code' => 'nullable|string',
        ]);

        // Create the userdetail record
        $userdetail = Userdetails::create($validated);
        return response()->json($userdetail, 201); // Return 201 status for successful creation
    }

    /**
     * Display the specified user detail.
     */
    public function show($id)
    {
        $userdetail = Userdetails::findOrFail($id); // Automatically throws a 404 if not found
        return response()->json($userdetail);
    }

    /**
     * Update the specified user detail.
     */
    public function update(Request $request, $id)
    {
        $userdetail = Userdetails::findOrFail($id); // Automatically throws a 404 if not found

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
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'od_limit' => 'nullable|string',
            'currency' => 'nullable|string',
            'email' => 'nullable|email',
            'customer_id' => 'nullable|string',
            'account_no' => 'nullable|string',
            'account_open_date' => 'nullable|date',
            'account_status' => 'nullable|string',
            'rtgs_neft_ifsc' => 'nullable|string',
            'micr' => 'nullable|string',
            'branch_code' => 'nullable|string',
            'product_code' => 'nullable|string',
        ]);

        // Update the userdetail record
        $userdetail->update($validated);
        return response()->json($userdetail);
    }

    /**
     * Remove the specified user detail.
     */
    public function destroy($id)
    {
        $userdetail = Userdetails::findOrFail($id); // Automatically throws a 404 if not found
        $userdetail->delete();
        return response()->json(['message' => 'User detail deleted successfully']);
    }
}
