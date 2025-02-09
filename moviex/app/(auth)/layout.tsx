'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div className="flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-black to-gray-900">
        <div className="w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="block mb-8 text-center">
                <div className="p-4 text-lg font-bold text-white border-b-2 border-white">
                    <a className="flex justify-center items-center space-x-2 w-full text-center">
                        <p className="w-[50px] h-[50px] rounded-full bg-white text-blue-900">MX</p>
                        <h1 className="text-2xl" >MovieX</h1>
                    </a>
                </div>
                <p className="mt-2 text-gray-400">Your Ultimate Movie Experience</p>
            </Link>
            
            {/* Auth Tabs */}
            <div className="flex mb-6">
                <Link
                    href="/login"
                    className={`flex-1 text-center py-3 ${
                        pathname === '/login'
                            ? 'text-red-600 border-b-2 border-red-600'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Sign In
                </Link>
                <Link 
                    href="/register"
                    className={`flex-1 text-center py-3 ${
                        pathname === '/register'
                            ? 'text-red-600 border-b-2 border-red-600'
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Sign Up
                </Link>
            </div>
            
            {/* Auth Form Container */}
            <div className="p-8 rounded-lg shadow-xl backdrop-blur-sm bg-gray-800/50">
                {children}
            </div>
        </div>
    </div>
)};

export default Layout;