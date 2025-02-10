'use client'
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/lib/services/auth';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const {login} = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    // console.log(data);
    try{
      const response = await authService.login(data.email, data.password, data?.remember)
      login(response.user);
      router.push('/home');
      router.refresh();
      // console.log('logged in successfully ', response);
    }catch(err: any){
      console.log(err);
      setError(err.response?.data?.message || 'Invalid email or password');
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
          <div className="relative mt-1">
            <input
              {...register('password')}
              type={showPassword ? "text" : "password"}
              placeholder={ showPassword ? "text" : "password"}
              className="px-4 py-2 w-full placeholder-gray-400 text-white bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-red-500"
            />
             <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-400 hover:text-gray-300"
              >
                  {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                      <AiOutlineEye className="w-5 h-5" />
                  )}
              </button>
          </div>
          {errors.password && (
            <span className="mt-1 text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center">
                <input
                    {...register('remember')}
                    type="checkbox"
                    className="w-4 h-4 text-red-600 bg-gray-800 rounded border-gray-700 focus:ring-red-500"
                />
                <label htmlFor="remember" className="block ml-2 text-sm text-gray-200">
                    Remember me
                </label>
            </div>
          <Link href="/forgot-password" className="text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="py-2 w-full font-semibold text-white bg-red-600 rounded transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? (
              <p className="w-8 h-8 rounded-full border-4 border-t-4 border-gray-200 border-solid animate-spin border-t-blue-500"></p>
              ) : ('Sign In')}
        </button>
      </form>
    </div>
  );
}

export default LoginPage