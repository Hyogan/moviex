'use client'
import Loader from '@/app/components/shared/loader';
import { loginSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const RegisterPage = () => {
  const loginValidator = loginSchema;
  type loginFormData = z.infer<typeof loginValidator>
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: loginFormData) => {
    setIsLoading(true);
    setError('');

    try{
      // backendcall for the register
      console.log(data);
    }catch(err){
      setError('Invalid email or password');
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">Welcome Back</h2>
      
      {error && (
        <div className="px-4 py-2 mb-6 text-red-500 rounded border border-red-500 bg-red-500/10">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="py-2 w-full font-semibold text-white bg-red-600 rounded transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {!isLoading  && (<Loader />) } { !isLoading ? 'Sign In' : ''}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage