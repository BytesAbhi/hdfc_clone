<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HDFC Bank Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .header {
            width: 12.5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            justify-content: center;
            margin-bottom: 50px;
            opacity: 0.8;
        }

        .header img {
            width: 150px;
        }

        .header .page-number {
            font-size: 12.5px;
            font-weight: bold;
        }

        .date-range {
            font-size: 12.5px;
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            border: none;
            /* Ensure no borders */
        }

        th,
        td {
            text-align: left;
            font-size: 10px;
            border: none;
            /* No cell borders */
        }

        th {
            text-align: center;
            font-weight: bold;
        }

        .no-border {
            border: none;
        }

        .right-align {
            text-align: left;
            padding: 5px 0;
        }

        .statement-footer {
            padding-top: 10px;
            margin-top: 20px;
        }

        .statement-footer h1 {
            font-size: 10px;
            color: blue;
            margin: 0;
            font-weight: bold;
        }

        .statement-footer p {
            font-size: 10px;
            margin: 5px 0;
        }

        .statement-footer p.important {
            font-size: 10px;
            color: red;
            font-weight: bold;
        }

        .statement-footer a {
            color: blue;
            text-decoration: none;
        }

        .statement-footer a:hover {
            text-decoration: underline;
        }

        .flex {
            width: 100%;
            background-color: yellow;
            display: flex;
            height: 200px;
            justify-content: space-between;
        }
    </style>
</head>

<body>
    <div>
        <div class="header">
            <div class="page-number">Page No .: 7</div>
        </div>

        <table style="width: 100%; font-family: Arial, sans-serif; font-size: 12px">
            <tr>
                <!-- Left Column -->
                <td style="width: 50%; vertical-align: top; padding: 10px">
                    <div style="text-align: center; margin-bottom: 15px">
                        <img src="{{ public_path('storage/HDFC-Bank-logo.jpg') }}" alt="HDFC Bank Logo"
                            style="height: 100px" />
                    </div>
                    <div style="padding: 10px border: 1px solid #000; ">
                        <p style="margin: 5px 0">
                            <strong>{{ $userDetails->account_holders }}</strong>
                        </p>
                        <p style="margin: 5px 0">Branch: {{ $userDetails->branch }}</p>
                        <p style="margin: 5px 0">IFSC: {{ $userDetails->ifsc }}</p>
                        <br />
                        <p style="margin: 5px 0">
                            Account Balance: {{ $userDetails->account_balance }}
                        </p>
                        <p style="margin: 5px 0">
                            Linked Cards: {{ $userDetails->linked_cards }}
                        </p>
                    </div>
                    <p style="margin-top: 20px">
                        Nomination: {{ $userDetails->nominee }}
                    </p>
                </td>

                <td style="width: 50%; vertical-align: top; padding: 10px">
                    <table style="width: 100%; font-size: 12.5px; border-collapse: collapse">
                        <tr>
                            <td>Account Branch:</td>
                            <td>{{ $userDetails->branch }}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{{ $userDetails->address }}</td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td>{{ $userDetails->city }}</td>
                        </tr>
                        <tr>
                            <td>State:</td>
                            <td>{{ $userDetails->state }}</td>
                        </tr>
                        <tr>
                            <td>Phone No.:</td>
                            <td>{{ $userDetails->phone_number }}</td>
                        </tr>
                        <tr>
                            <td>OD Limit:</td>
                            <td>{{ $userDetails->od_limit }}</td>
                        </tr>
                        <tr>
                            <td>Currency:</td>
                            <td>{{ $userDetails->currency }}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{{ $userDetails->email }}</td>
                        </tr>
                        <tr>
                            <td>Cust ID:</td>
                            <td>{{ $userDetails->customer_id }}</td>
                        </tr>
                        <tr>
                            <td>Account No:</td>
                            <td>{{ $userDetails->account_no }}</td>
                        </tr>
                        <tr>
                            <td>A/C Open Date:</td>
                            <td>{{ $userDetails->account_open_date ? $userDetails->account_open_date->format('Y-m-d') : '' }}
                            </td>
                        </tr>
                        <tr>
                            <td>Account Status:</td>
                            <td>{{ $userDetails->account_status }}</td>
                        </tr>
                        <tr>
                            <td>RTGS/NEFT IFSC:</td>
                            <td>{{ $userDetails->rtgs_neft_ifsc }}</td>
                        </tr>
                        <tr>
                            <td>MICR:</td>
                            <td>{{ $userDetails->micr }}</td>
                        </tr>
                        <tr>
                            <td>Branch Code:</td>
                            <td>{{ $userDetails->branch_code }}</td>
                        </tr>
                        <tr>
                            <td>Product Code:</td>
                            <td>{{ $userDetails->product_code }}</td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>

        <table style="width: 100%">
            <tr>
                <td style="width: 50%; text-align: left; color: black">
                    Statement of Account
                </td>
                <td style="width: 50%; text-align: right">
                    From: 01/09/2022 To: 16/09/2023
                </td>
            </tr>
        </table>

        <div>
            <table>
                <thead>
                    <tr>
                        <th class="right-align">Date</th>
                        <th class="right-align">Description</th>
                        <th class="right-align">Ref. No.</th>
                        <th class="right-align">Amount</th>
                        <th class="right-align">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($userStatements as $statement)
                        <tr style="padding: 10px 0;">
                            <td class="right-align">{{ $statement->date }}</td>
                            <td class="right-align">{{ $statement->description }}</td>
                            <td class="right-align">{{ $statement->ref_num }}</td>
                            <td class="right-align">{{ $statement->amount }}</td>
                            <td class="right-align">{{ $statement->balance }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="statement-footer">
            <h1>HDFC BANK LIMITED</h1>
            <p class="important">
                *Closing balance includes funds earmarked for hold and uncleared funds
            </p>
            <p>
                Contents of this statement will be considered correct if no error is
                reported within 30 days of receipt of statement. The address on this
                statement is that on record with the Bank as at the day of requesting
                this statement.
            </p>
            <p><strong>State account branch GSTN:</strong> 06AAACH2702H1Z4</p>
            <p>
                HDFC Bank GSTIN number details are available at
                <a href="https://www.hdfcbank.com/personal/making-payments/online-tax-payment/goods-and-service-tax"
                    target="_blank">
                    https://www.hdfcbank.com/personal/making-payments/online-tax-payment/goods-and-service-tax </a>.
            </p>
            <p>
                <strong>Registered Office Address:</strong> HDFC Bank House, Senapati
                Bapat Marg, Lower Parel, Mumbai 400013
            </p>
        </div>
    </div>
</body>

</html>
