<?php
namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthTokenController extends Controller
{
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
        return response()->json(['access_token' => $token, 'token_type' => 'Bearer','user'=> $user]);
    }

    public function revokeToken()
    {
        // Revoke all of the user's tokens
        // Auth::user()->tokens()->delete();
        // return response()->json(['message' => 'Tokens revoked']);
    }
}