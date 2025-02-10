'use client'
import { loginSchema, RegisterFormData, registerSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'


const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement API call
      console.log(data);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
    <h2 className="mb-6 text-2xl font-bold text-white">Create Account</h2>
    
    {error && (
      <div className="px-4 py-2 mb-6 text-red-500 rounded border border-red-500 bg-red-500/10">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="overflow-hidden relative mb-2 w-24 h-24 bg-gray-700 rounded-full">
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        <input
          type="file"
          {...register('avatar')}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id="avatar"
        />
        <label
          htmlFor="avatar"
          className="text-sm text-red-500 cursor-pointer hover:underline"
        >
          Upload Profile Picture
        </label>
      </div>

      <div>
        <input
          {...register('name')}
          type="text"
          placeholder="Full Name"
          className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
        />
        {errors.name && (
          <span className="mt-1 text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <input
          {...register('username')}
          type="text"
          placeholder="Username"
          className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
        />
        {errors.username && (
          <span className="mt-1 text-sm text-red-500">{errors.username.message}</span>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
        />
        {errors.email && (
          <span className="mt-1 text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
        />
        {errors.password && (
          <span className="mt-1 text-sm text-red-500">{errors.password.message}</span>
        )}
      </div>

      <div>
        <input
          {...register('password_confirmation')}
          type="password"
          placeholder="Confirm Password"
          className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
        />
        {errors.password_confirmation && (
          <span className="mt-1 text-sm text-red-500">{errors.password_confirmation.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="py-2 w-full font-semibold text-white bg-red-600 rounded transition-colors hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  </div>
 );
}

export default RegisterPage