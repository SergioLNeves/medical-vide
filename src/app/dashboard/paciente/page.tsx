'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/app/dashboard/_components/navbar/navbar';
import CardFunction from '@/components/card-function/card-function';
import InfoPaciente from '../_components/info-pacients/info-paciente';
import { Calendar } from "lucide-react";

export default function DashboardPacientePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (user.role !== 'paciente') {
                // Redireciona para a dashboard correta baseada na role
                router.push(`/dashboard/${user.role}`);
            }
        }
    }, [user, loading, router]);

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    // Mostra loading enquanto verifica autenticação
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'paciente') {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar onLogout={handleLogout} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <CardFunction
                            icon={<Calendar />}
                            title='Agendar Consulta'
                            onClick={() => router.push(`/schedule`)}
                            buttonText=' Agendar'
                            description='Marque sua consulta'
                        />
                    </div>
                    <InfoPaciente user={user} />
                </div>
            </main>
        </div>
    );
}
