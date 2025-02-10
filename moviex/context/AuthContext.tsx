'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/lib/services/auth';
import { usePathname, useRouter } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/lib/constants';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string | null;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (PUBLIC_ROUTES.includes(pathname)) {
            setIsLoading(false);
            return;
        }
        const checkAuth = async () => {
            try {
                const userData = await authService.checkAuthStatus();
                setUser(userData);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []); // Empty dependency array means this only runs once on mount

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}