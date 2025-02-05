<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verifyEmail(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return response()->json(['message' => 'Email verified successfully']);
    }

    public function resendVerificationEmail()
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified']);
        }

        auth()->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Verification email sent']);
    }
}
