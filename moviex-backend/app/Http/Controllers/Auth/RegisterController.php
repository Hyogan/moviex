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
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imagePath = $image->store('profile_pictures', 'public');
            $registerData['profile_picture'] = $imagePath;
        }
        $registerData['password'] = Hash::make($registerData['password']);

        $user = User::create([
            'name' => $registerData['name'],
            'username' => $registerData['username'],
            'role' => $registerData['role'],
            'email' => $registerData['email'],
            'password' => Hash::make($registerData['password']),
        ]);
        $token = $user->createToken('moviex')->plainTextToken;

        return response()->json(['message' => 'User registered successfully', 'user' => $user,'token'=> $token]);

    }
}
