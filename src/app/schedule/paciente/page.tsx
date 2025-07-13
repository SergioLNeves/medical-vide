"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function SchedulePacientePage() {
    const router = useRouter();
    const isMobile = useIsMobile();

    return (
        <main className="min-h-screen bg-background">
            <nav className="flex flex-row justify-between max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                    <ArrowLeft className="h-4 w-4" />
                    {!isMobile && <span className="ml-2">Voltar</span>}
                </Button>
            </nav>

            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-primary mb-6">Agendar Paciente</h1>
                    {/* Aqui você pode adicionar o formulário ou componentes necessários para agendar um paciente */}
                    <p className="text-secondary">Formulário de agendamento de paciente será implementado aqui.</p>
                </div>
            </header>

        </main>
    );
}