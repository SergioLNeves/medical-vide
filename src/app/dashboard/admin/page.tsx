'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/navbar/navbar';

export default function DashboardAdminPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (user.role !== 'admin') {
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar user={user} onLogout={handleLogout} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Card de Boas-vindas */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Painel Administrativo
                                </h2>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                                    Bem-vindo ao painel administrativo!
                                </h3>
                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                    Gerencie usuários, configurações do sistema, relatórios e tenha controle total sobre a plataforma médica.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cards de Funcionalidades */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Gerenciar Usuários */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">👥</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Gerenciar Usuários
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                15 usuários ativos
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Usuários
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Relatórios do Sistema */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">📊</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Relatórios do Sistema
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Analytics e métricas
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

                        {/* Configurações */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">⚙️</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Configurações
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Sistema e segurança
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Configurar
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Backup e Dados */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">💾</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Backup e Dados
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Gerenciar backups
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Fazer Backup
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Logs do Sistema */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">📝</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Logs do Sistema
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Auditoria e monitoramento
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Ver Logs
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Permissões */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm">🔐</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                Permissões
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                Controle de acesso
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button className="w-full" variant="outline">
                                        Gerenciar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Informações do Administrador */}
                    <div className="mt-6 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Informações do Administrador
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
                                        Email Administrativo
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.email}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        ID Administrador
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.id}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nível de Acesso
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        Administrador Total
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
