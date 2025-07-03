'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Se já estiver logado, redireciona para o dashboard
      router.push('/dashboard');
    } else {
      // Se não estiver logado, redireciona para o login
      router.push('/auth/login');
    }
  }, [user, router]);

  // Retorna null pois o redirecionamento é imediato
  return null;
}
