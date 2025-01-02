<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use App\Models\UserStatement;
use Illuminate\Http\Request;
use Mpdf\Mpdf;

class PDFController extends Controller
{
    public function generatePDF(Request $request, $userId)
    {
        // Retrieve the "from" and "to" dates from the request
        $fromDate = $request->input('from');
        $toDate = $request->input('to');

        // Fetch user details
        $userDetails = UserDetails::find($userId);

        if (!$userDetails) {
            return response()->json(['error' => 'User details not found.'], 404);
        }

        // Fetch user statements based on the date range
        $query = UserStatement::where('user_id', $userId);

        if ($fromDate) {
            $query->where('date', '>=', $fromDate);
        }

        if ($toDate) {
            $query->where('date', '<=', $toDate);
        }

        $userStatements = $query->orderBy('date', 'asc')->get();

        if ($userStatements->isEmpty()) {
            return response()->json(['error' => 'No statements found for the selected date range.'], 404);
        }

        // Prepare data for JSON response
        $data = [
            'userDetails' => $userDetails,
            'userStatements' => $userStatements,
            'fromDate' => $fromDate,
            'toDate' => $toDate,
        ];

        return response()->json($data, 200);
            return response()->streamDownload(function () use ($mpdf) {
            echo $mpdf->Output('', 'S');
        }, $fileName);
    }
}
