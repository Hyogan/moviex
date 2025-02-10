<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $registerData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:content_creator,viewer',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        if ($request->hasFile('avatar')) {
            $image = $request->file('avatar');
            $imagePath = $image->store('profile_pictures', 'public');
            $registerData['avatar'] = $imagePath;
        }
        $registerData['password'] = Hash::make($registerData['password']);

        $user = User::create([
            'name' => $registerData['name'],
            'username' => $registerData['username'],
            'role' => $registerData['role'],
            'email' => $registerData['email'],
            'password' => Hash::make($registerData['password']),
            'avatar' => $registerData['avatar'] ?? null,
        ]);
        $token = $user->createToken('moviex')->plainTextToken;

        return response()->json(['message' => 'User registered successfully', 'user' => $user,'token'=> $token]);

    }
}
