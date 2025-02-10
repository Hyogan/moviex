<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $remember = $request->boolean('remember', false);
        $user = User::where('email',$credentials['email'])->first();
        // $credentials['password']=Hash::make(Hash::make($credentials['password']));
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        //get the authenticated user to return 
        $token = $user->createToken('auth_token', [], $remember ? now()->addDays(30) : now()->addHours(24))->plainTextToken;
        $cookieTime = $remember ? 60 * 24 * 30 : null;
        return response()->json([
                'access_token' => $token, 
                'token_type' => 'Bearer',
                'user'=> $user])->withCookie(cookie(
                    'token', 
                    $token, 
                    $cookieTime,
                    '/',
                    null,
                    config('app.env') === 'production',
                    true
                ))
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'POST');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
