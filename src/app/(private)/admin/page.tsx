'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Loading from '@/components/loading/loading';
import { UserRoundCog, UserSearchIcon } from 'lucide-react';
import { MockDatabase } from '@/mocks/database';
import { User } from '@/mocks/types';
import ListUsers from './_components/list-users';

export default function DashboardAdminPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();

  // Redirect if user is not an admin
  // Only users with the 'admin' role can access this page
  // If the user is logged in but has a different role, redirect them to their respective page
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push(`/${user?.role}`);
    }
  }, [user, router]);

  useEffect(() => {
    const fetchedUsers = MockDatabase.getUsers();
    setUsers(fetchedUsers);
  }, []);

  const handleLogout = () => {
    logout(); // Clear user session
    router.refresh(); // Refresh the page to reflect the logout state
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar onLogout={handleLogout} />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
        <div className='flex flex-col gap-12 px-4 py-6 sm:px-0'>
          <section className='gap-4 flex flex-col'>
            <h1 className="text-3xl font-bold md:text-4xl">
              Gerenciar Usuários
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              Adicione novos usuários, edite informações existentes e visualize detalhes dos usuários cadastrados no sistema. Gerencie permissões e mantenha o controle administrativo de forma simples e eficiente.
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <UserSearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filtrar por nome do usuário..."
                  className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <ListUsers users={users} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
