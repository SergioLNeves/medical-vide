'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/navbar/navbar';

export default function DashboardMedicoPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (user.role !== 'medico') {
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'medico') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                                    Área Médica
                                </h2>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                                    Bem-vindo à área médica!
                                </h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    Gerencie seus pacientes, consultas, prontuários e tenha acesso a todas as ferramentas médicas necessárias.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cards de Funcionalidades */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Agenda do Dia */}
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
                                                Agenda do Dia
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                5 consultas agendadas
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Agenda
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Pacientes */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">👥</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Meus Pacientes
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Gerenciar pacientes
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Pacientes
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Prontuários */}
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
                                                Prontuários
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Histórico médico
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Prontuários
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Prescrições */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">💊</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Prescrições
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Receitas médicas
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Nova Prescrição
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Exames */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">🧪</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Exames
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Solicitar exames
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Solicitar Exame
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Relatórios */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">📊</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Relatórios
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Estatísticas médicas
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Relatórios
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Médico */}
                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Informações Profissionais
                            </h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nome Completo
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        Dr(a). {user.name}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Email Profissional
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.email}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        ID Médico
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
