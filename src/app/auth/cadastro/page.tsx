'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { registerUser, initializeUsers } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const cadastroSchema = z.object({
    name: z.string().min(1, 'Por favor, insira seu nome'),
    email: z.string().min(1, 'Por favor, insira seu email').email('Por favor, insira um email válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Por favor, confirme sua senha')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
});

function CadastroForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        // Inicializa os usuários mock no localStorage
        initializeUsers();

        // Pré-preenche o email se veio da tela de login
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const formData = { name, email, password, confirmPassword };
            cadastroSchema.parse(formData);

            setLoading(true);

            const newUser = registerUser(email, password, name);

            if (newUser) {
                // Login automático após cadastro
                login(newUser);
                router.push(`/dashboard/${newUser.role}`);
            } else {
                setError('Email já cadastrado');
            }

            setLoading(false);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError(error.errors[0].message);
            } else {
                setError('Erro interno do sistema');
            }
        }
    };

    const handleBackToLogin = () => {
        router.push('/auth/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Criar conta
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Cadastre-se como paciente para acessar o sistema
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nome completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Digite seu nome completo"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Digite seu email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Digite sua senha (mín. 6 caracteres)"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirmar senha
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Confirme sua senha"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}

                    <div className="flex space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleBackToLogin}
                            className="flex-1"
                        >
                            Voltar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1"
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Apenas pacientes podem se cadastrar.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Médicos e administradores são criados pelo sistema.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CadastroPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
                </div>
            </div>
        }>
            <CadastroForm />
        </Suspense>
    );
}
