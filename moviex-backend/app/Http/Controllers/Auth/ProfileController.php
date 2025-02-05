<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show()
    {
        return response()->json(Auth::user());
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . Auth::auth()->id(),
        ]);

        // auth()->user()->update($validatedData);

        $user = $request->user();
        $user->update($validatedData);
        $user->save();

        return response()->json(['message' => 'Profile updated successfully']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, Auth::user()->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        $request->user()->update(['password' => Hash::make($request->new_password)]);

        return response()->json(['message' => 'Password changed successfully']);
    }


    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        $user = Auth::user();
        if ($request->hasFile('profile_picture')) {
            // Delete the old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }
            $image = $request->file('profile_picture');
            $imagePath = $image->store('profile_pictures', 'public');
            // Update the database with the new image path

            // auth()->()->update([
            //     'profile_picture' => $imagePath,
            // ]);
            $user = $request->user();
            $user->update(['profile_picture' => $imagePath]);
            $user->save();

        }

        return response()->json([
            'message' => 'Profile picture updated successfully',
            'profile_picture_url' => $user->profile_picture,
        ]);





        // KEEP FOR LATER 

            // Open the new image and perform any modifications
            // $image = $request->file('profile_picture');
            // $imageResized = Image::make($image)->resize(300, 300);  // Resize or manipulate image

            // Save the new image
            // $imagePath = $imageResized->store('profile_pictures', 'public');
    }

}
