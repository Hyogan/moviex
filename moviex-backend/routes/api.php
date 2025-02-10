<?php

use App\Http\Controllers\auth\AuthTokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// Public auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'issueToken']);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('/reset-password', [ResetPasswordController::class, 'reset']);
});

// Protected auth routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);
    Route::get('/me', [LoginController::class, 'me']);
    
    // Email verification routes
    Route::prefix('email')->group(function () {
        Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verifyEmail'])
            ->middleware(['signed'])
            ->name('verification.verify');
        Route::post('/verification-notification', [VerificationController::class, 'resendVerificationEmail'])
            ->middleware(['throttle:6,1'])
            ->name('verification.send');
    });
}); 
