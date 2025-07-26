'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/app/(private)/_components/navbar/navbar';
import CardFunction from '@/components/card-function/card-function';
import InfoPaciente from './_components/info-pacients/info-paciente';
import { Calendar } from "lucide-react";

export default function DashboardPacientePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && user.role !== 'paciente') {
            router.push(`/${user?.role}`);
        }
    }, [user, router]);

    const handleLogout = () => {
        logout();
        router.refresh();
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar onLogout={handleLogout} />
            <section className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <CardFunction
                            icon={<Calendar />}
                            title='Agendar Consulta'
                            onClick={() => router.push(`/${user.role}/schedule`)}
                            buttonText=' Agendar'
                            description='Marque sua consulta'
                        />
                    </div>
                    <InfoPaciente user={user} />
                </div>
            </section>
        </main>
    );
}
