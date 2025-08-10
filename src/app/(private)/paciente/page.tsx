"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/navbar/navbar';
import CardFunction from '@/components/card-function/card-function';
import InfoPaciente from './_components/info-pacients/info-paciente';
import { Calendar } from 'lucide-react';

export default function DashboardPacientePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Com o layout privado, sempre teremos um usuário aqui
  // O TypeScript não sabe disso, então usamos uma declaração para garantir que user não é null
  if (!user) return null; // Nunca deve acontecer por causa do layout

  return (
    <main className="bg-background min-h-screen">
      <Navbar onLogout={handleLogout} />
      <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardFunction
              icon={<Calendar />}
              title="Agendar Consulta"
              onClick={() => router.push(`/${user.role}/schedule`)}
              buttonText=" Agendar"
              description="Marque sua consulta"
            />
          </div>
          <InfoPaciente user={user} />
        </div>
      </section>
    </main>
  );
}
