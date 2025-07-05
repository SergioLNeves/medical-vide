'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Navigation() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <nav className="bg-white dark:bg-gray-800 shadow mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                            Medical System
                        </Link>
                        <div className="flex space-x-4">
                            <Link href="/auth/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button>Cadastrar</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white dark:bg-gray-800 shadow mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
                        Medical System
                    </Link>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {user.name} ({user.role})
                        </span>
                        <Button variant="outline" onClick={logout}>
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
