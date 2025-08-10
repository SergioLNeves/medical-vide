'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/loading/loading';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Se não estiver autenticado, redireciona para login
      if (!user) {
        router.push('/');
        return;
      }

      // Verifica se o usuário está tentando acessar uma rota correspondente ao seu papel
      const currentRole = pathname.split('/')[1]; // pega "admin", "medico" ou "paciente"

      // Se estiver tentando acessar uma rota que não corresponde ao seu papel, redireciona
      if (currentRole !== user.role) {
        router.push(`/${user.role}`);
      }
    }
  }, [user, router, pathname, loading]);

  // Mostra loading enquanto verifica autenticação
  if (loading || !user) {
    return <Loading />;
  }

  // Se autenticado e na rota correta, renderiza a página
  return <>{children}</>;
}
