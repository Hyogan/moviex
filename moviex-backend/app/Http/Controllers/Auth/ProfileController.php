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
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:1024',
        ]);

        $user = Auth::user();
        if ($request->hasFile('avatar')) {
            // Delete the old profile picture if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $image = $request->file('avatar');
            $imagePath = $image->store('profile_pictures', 'public');
            // Update the database with the new image path

            // auth()->()->update([
            //     'avatar' => $imagePath,
            // ]);
            $user = $request->user();
            $user->update(['avatar' => $imagePath]);
            $user->save();

        }

        return response()->json([
            'message' => 'Profile picture updated successfully',
            'avatar' => $user->profilavatare_picture,
        ]);





        // KEEP FOR LATER 

            // Open the new image and perform any modifications
            // $image = $request->file('avatar');
            // $imageResized = Image::make($image)->resize(300, 300);  // Resize or manipulate image

            // Save the new image
            // $imagePath = $imageResized->store('profile_pictures', 'public');
    }

}
