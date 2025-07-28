"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from 'zod';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkEmailExists, registerUser } from "@/lib/auth";
import { toast } from "sonner";
import Loading from "@/components/loading/loading";

const registerSchema = z
    .object({
        fullName: z.string().min(1, 'insira o nome completo do usuário'),
        email: z
            .string()
            .min(1, 'insira o email')
            .email('insira um email válido'),
        role: z.enum(['admin', 'medico', 'paciente'], {
            message: 'selecione a função do usuário',
        }),
    })

type RegisterFormData = z.infer<typeof registerSchema>;

// código para gerar senha aleatória
const generateRandomPassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 6; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export default function CreateUserPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: '',
        email: '',
        role: 'admin',
    });

    const updateField = (field: keyof RegisterFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getRoleDisplayName = (role: string) => {
        const roles = {
            'admin': 'Administrador',
            'medico': 'Médico',
            'paciente': 'Paciente'
        };
        return roles[role as keyof typeof roles] || 'Selecione uma função';
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Valida os dados do formulário
            const validatedData = registerSchema.parse(formData);

            // Gera senha aleatória e adiciona no forms
            const password = generateRandomPassword();
            const userDataWithPassword = {
                ...validatedData,
                password
            };

            if (checkEmailExists(userDataWithPassword.email)) {
                setError('Email já cadastrado');
                toast.error('Erro ao criar usuário', {
                    description: 'Email já cadastrado'
                });
                return;
            }

            const newUser = registerUser(userDataWithPassword.email, userDataWithPassword.password, userDataWithPassword.fullName);

            if (newUser) {
                console.log('Senha:', userDataWithPassword.password);

                // Reseta o formulário após o envio para novas entradas
                setFormData({
                    fullName: '',
                    email: '',
                    role: 'admin',
                });

                toast.success('Usuário criado com sucesso!', {
                    description: `Senha enviada para: ${userDataWithPassword.email}`
                });

                router.push('/admin'); // Redireciona para a página de administração
            } else {
                setError('Erro ao criar usuário');
                toast.error('Erro ao criar usuário');
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                const firstError = error.errors[0];
                setError(firstError.message);
                toast.error('Erro de validação', {
                    description: firstError.message
                });
                console.error('Validation error:', error.errors);
            } else {
                setError('Erro interno do sistema');
                toast.error('Erro interno do sistema');
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="bg-background min-h-screen">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <Button variant={"outline"} onClick={() => router.push('/admin')}>
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Voltar
                </Button>
            </nav>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
                <div className='flex flex-col gap-12 px-4 py-6 sm:px-0'>

                    <section className='gap-4 flex flex-col'>
                        <h1 className="text-3xl font-bold md:text-4xl">
                            Criar Novo Usuário
                        </h1>
                        <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
                            Crie novos usuários para o sistema, definindo suas funções e permissões de acesso as senhas serão enviadas por email cadastrado. Certifique-se de que as informações estão corretas antes de criar o usuário.
                        </p>
                    </section>

                    <form onSubmit={handleCreateUser} className="space-y-6 max-w-5xl">
                        <div className="space-y-2">
                            <label htmlFor="role" className="block text-sm font-medium text-accent-foreground">
                                Função*
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between text-left font-normal"
                                        disabled={loading}
                                    >
                                        {getRoleDisplayName(formData.role)}
                                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]">
                                    <DropdownMenuItem onClick={() => updateField('role', 'admin')}>
                                        Administrador
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateField('role', 'medico')}>
                                        Médico
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateField('role', 'paciente')}>
                                        Paciente
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-accent-foreground">
                                Nome Completo*
                            </label>
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-accent-foreground">
                                Email*
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                required
                                disabled={loading}
                                placeholder="exemplo@email.com"
                            />
                        </div>

                        {error && (
                            <div className="text-center text-sm text-red-600">{error}</div>
                        )}

                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => router.back()}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Criando...' : 'Criar Usuário'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </main>
    );
}