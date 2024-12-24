<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use App\Models\UserStatement;
use Mpdf\Mpdf;

class PDFController extends Controller
{
    public function generatePDF($userId)
    {
        $userDetails = UserDetails::find($userId);
        $userStatements = UserStatement::where('user_id', $userId)->get();

        if (!$userDetails || $userStatements->isEmpty()) {
            return response()->json(['error' => 'User details or statements not found.'], 404);
        }

        $data = [
            'userDetails' => $userDetails,
            'userStatements' => $userStatements,
        ];

        $html = view('pdf.user-report', $data)->render();


        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'orientation' => 'P',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 20,
            'margin_bottom' => 20,
        ]);


        $mpdf->WriteHTML($html);


        return response()->streamDownload(function () use ($mpdf) {
            echo $mpdf->Output('', 'S');
        }, 'user-report.pdf');
    }
}
