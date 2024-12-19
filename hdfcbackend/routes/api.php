<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Userdetailscontroller;
use App\Http\Controllers\UserstatementController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/hello', function () {
    return 'Hello';
});

Route::prefix('v1')->group(function () {
    Route::apiResource('userdetails', Userdetailscontroller::class);
});



Route::apiResource('v1/userstatements', UserstatementController::class);

