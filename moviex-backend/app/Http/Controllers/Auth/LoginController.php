<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Logged in successfully']);
        }
        return response()->json(['message','invalid credentials'],401);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully']);
    }





    public function issueToken(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email',$credentials['email'])->first();
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        //get the authenticated user to return 
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
                'access_token' => $token, 
                'token_type' => 'Bearer',
                'user'=> $user])->withCookkie(cookie(
                    'token', 
                    $token, 
                    60 * 24 * 30,
                    null,
                    null,
                    true,
                    true
                ));
    }
}
