'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Só redireciona se não estiver carregando e não tiver usuário
        if (!loading && !user) {
            router.push('/auth/login');
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

    // Se não estiver carregando e não tiver usuário, retorna null (redirecionamento já foi feito)
    if (!user) {
        return null;
    }

    const getRoleDisplayName = (role: string) => {
        switch (role) {
            case 'paciente':
                return 'Paciente';
            case 'medico':
                return 'Médico';
            case 'admin':
                return 'Administrador';
            default:
                return role;
        }
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'paciente':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'medico':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'admin':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Medical Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Bem-vindo, {user.name}
                            </span>
                            <Button variant="outline" onClick={handleLogout}>
                                Sair
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Informações do Usuário
                                </h2>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                    {getRoleDisplayName(user.role)}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Nome
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
                                        Tipo de Usuário
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {getRoleDisplayName(user.role)}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        ID do Usuário
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {user.id}
                                    </dd>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                                    Status do Login
                                </h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    ✅ Login realizado com sucesso! Você está autenticado como {getRoleDisplayName(user.role).toLowerCase()}.
                                </p>
                            </div>

                            {user.role === 'paciente' && (
                                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                                        Área do Paciente
                                    </h3>
                                    <p className="text-sm text-green-700 dark:text-green-300">
                                        Bem-vindo à sua área pessoal. Aqui você pode agendar consultas, ver seus dados médicos e muito mais.
                                    </p>
                                </div>
                            )}

                            {user.role === 'medico' && (
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                                        Área Médica
                                    </h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Bem-vindo à área médica. Aqui você pode gerenciar seus pacientes, consultas e prontuários.
                                    </p>
                                </div>
                            )}

                            {user.role === 'admin' && (
                                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                                        Painel Administrativo
                                    </h3>
                                    <p className="text-sm text-purple-700 dark:text-purple-300">
                                        Bem-vindo ao painel administrativo. Aqui você pode gerenciar usuários, configurações do sistema e relatórios.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
