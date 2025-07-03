'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { checkEmailExists, validateLogin, initializeUsers } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const [step, setStep] = useState<'email' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        // Inicializa os usuários mock no localStorage
        initializeUsers();
    }, []);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Por favor, insira seu email');
            return;
        }

        if (checkEmailExists(email)) {
            setStep('password');
        } else {
            // Redireciona para cadastro se email não existir
            // Adiciona o email como parâmetro na URL
            router.push(`/auth/cadastro?email=${encodeURIComponent(email)}`);
        }
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!password.trim()) {
            setError('Por favor, insira sua senha');
            return;
        }

        const user = validateLogin(email, password);
        if (user) {
            login(user);
            router.push('/dashboard');
        } else {
            setError('Senha incorreta');
        }
    };

    const handleBackToEmail = () => {


        setStep('email');
        setPassword('');
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-primary">
                        {step === 'email' ? 'Acesse sua conta' : 'Digite sua senha'}
                    </h2>
                    <p className="mt-2 text-sm text-foreground">
                        {step === 'email'
                            ? 'Insira seu email para continuar'
                            : `Bem-vindo de volta, ${email}`
                        }
                    </p>
                </div>

                {step === 'email' ? (
                    <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
                        <div>
                            <label htmlFor="email" className="sr-only">
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
                                className="relative block w-full px-3 py-2 border
                                border-primary placeholder-accent-foreground
                                text-accent-foreground  bg-accent rounded-md
                                focus:outline-none focus:ring-primary-500 focus:border-primary-500
                                focus:z-10 sm:text-sm"
                                placeholder="Digite seu email"
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center">{error}</div>
                        )}

                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4"
                        >
                            Continuar
                        </Button>


                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full px-3 py-2 border
                                border-primary placeholder-accent-foreground
                                text-accent-foreground  bg-accent rounded-md
                                focus:outline-none focus:ring-primary-500 focus:border-primary-500
                                focus:z-10 sm:text-sm"
                                placeholder="Digite sua senha"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center">{error}</div>
                        )}

                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleBackToEmail}
                                className="flex-1"
                            >
                                Voltar
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                            >
                                Entrar
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
