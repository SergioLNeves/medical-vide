'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Schedule() {

    const { user, loading } = useAuth();
    const router = useRouter();

    // Aqui acontece a autenticação e redirecionamento
    // Se o usuário não estiver logado, redireciona para a página de login
    // Se estiver logado, redireciona para a página de schedule com base na role do usuário
    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else {
                router.push(`/schedule/${user.role}`);
            }
        }

    }, [user, loading, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4">Redirecionando...</p>
            </div>
        </div>
    );
}