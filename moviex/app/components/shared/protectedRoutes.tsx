'use client'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import React from 'react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-red-500 animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}