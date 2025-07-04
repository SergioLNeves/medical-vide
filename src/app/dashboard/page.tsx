'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else {
                // Redireciona para a dashboard específica baseada na role
                router.push(`/dashboard/${user.role}`);
            }
        }
    }, [user, loading, router]);

    // Mostra loading enquanto verifica autenticação e redireciona
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4">Redirecionando...</p>
            </div>
        </div>
    );
}
