'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/navbar/navbar';
import CardFunction from '@/components/card-function/card-function';
import InfoPaciente from './_components/info-pacients/info-paciente';
import { Calendar } from 'lucide-react';
import Loading from '@/components/loading/loading';

export default function DashboardPacientePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'paciente') {
      router.push(`/${user?.role}`);
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return <Loading />;
  }

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
