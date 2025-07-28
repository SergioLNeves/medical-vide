'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Loading from '@/components/loading/loading';
import { UserSearchIcon } from 'lucide-react';
import { MockDatabase } from '@/mocks/database';
import { User } from '@/mocks/types';
import ListUsers from './_components/list-users';
import DeleteUserModal from './_components/delete-user-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DashboardAdminPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const router = useRouter();

  // Redireciona usuários não administradores para suas respectivas páginas
  // Isso garante que apenas administradores possam acessar a página de administração
  // Se o usuário não for admin, redireciona para a página do seu papel
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push(`/${user?.role}`);
    }
  }, [user, router]);

  // Busca usuários do localStorage ao carregar a página
  // Isso simula a busca de dados de um banco de dados real
  // Em uma aplicação real, você substituiria isso por uma chamada de API
  useEffect(() => {
    const fetchedUsers = MockDatabase.getUsers();
    setUsers(fetchedUsers);
  }, []);

  const handleLogout = () => {
    logout(); // Clear user session
    router.push('/'); // Refresh the page to reflect the logout state
  };

  const handleEditUser = (user: User) => {
    console.log(`Editing user with ID: ${user.id}`, user);
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleUserDeleted = (deletedUser: User) => {
    // Remover usuário da lista local
    setUsers(prevUsers => prevUsers.filter(u => u.id !== deletedUser.id));
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
              Gerencie todos os usuários do sistema de forma centralizada. Adicione novos usuários, edite perfis existentes, configure permissões e mantenha o controle total sobre o acesso à plataforma.
            </p>
          </section>
          <section className="flex flex-col gap-4">

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full md:max-w-md">
                <Input
                  type="text"
                  placeholder="Filtrar por nome do usuário..."
                />
              </div>
              <Button
                type='button'
                onClick={() => router.push('/admin/create-user')}
                className='w-full md:w-sm'
              >
                <UserSearchIcon className="h-3 w-3" />
                Adicionar Usuário
              </Button>
            </div>

            <div className="rounded-md border">
              <ListUsers
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        userToDelete={userToDelete}
        onClose={handleCloseDeleteModal}
        onUserDeleted={handleUserDeleted}
      />
    </main>
  );
}
