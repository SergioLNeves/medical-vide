'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/navbar/navbar';

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
            {/* Header */}
            <Navbar user={user} onLogout={handleLogout} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Card de Boas-vindas */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Área do Paciente
                                </h2>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                                    Bem-vindo à sua área pessoal!
                                </h3>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    Aqui você pode agendar consultas, visualizar seus exames, acompanhar seu histórico médico e muito mais.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cards de Funcionalidades */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Agendar Consulta */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">📅</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Agendar Consulta
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Marque uma consulta
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Agendar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Meus Exames */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">🧪</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Meus Exames
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Resultados disponíveis
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Exames
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Histórico Médico */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">📋</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Histórico Médico
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Consultas anteriores
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Histórico
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Usuário */}
                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Suas Informações
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nome Completo
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.name}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.email}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        ID do Paciente
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.id}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
