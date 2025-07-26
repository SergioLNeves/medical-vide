'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function SchedulePacientePage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <main className="bg-background min-h-screen">
      <nav className="mx-auto flex max-w-7xl flex-row justify-between px-4 py-6 lg:px-8">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          {!isMobile && <span className="ml-2">Voltar</span>}
        </Button>
      </nav>

      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-primary mb-6 text-3xl font-bold">
            Agendar Paciente
          </h1>
          {/* Aqui você pode adicionar o formulário ou componentes necessários para agendar um paciente */}
          <p className="text-secondary">
            Formulário de agendamento de paciente será implementado aqui.
          </p>
        </div>
      </header>
    </main>
  );
}
