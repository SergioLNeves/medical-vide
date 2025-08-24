'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import { UserSearchIcon } from 'lucide-react';
import { MockDatabase } from '@/mocks/database';
import { User } from '@/mocks/types';
import ListUsers from './_components/list-users';
import DeleteUserModal from './_components/delete-user-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EditUserModal from './_components/edit-user-modal';

export default function DashboardAdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Estados para gerenciamento de usuários
  const [users, setUsers] = useState<User[]>([]); // Lista filtrada exibida na tela
  const [allUsers, setAllUsers] = useState<User[]>([]); // Lista completa para referência
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca para filtrar usuários

  // Estados para modais de ação
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Carrega todos os usuários do MockDatabase quando o componente monta
  // Busca usuários do localStorage ao carregar a página
  // Isso simula a busca de dados de um banco de dados real
  // Em uma aplicação real, você substituiria isso por uma chamada de API
  useEffect(() => {
    const fetchedUsers = MockDatabase.getUsers();
    setAllUsers(fetchedUsers);
    setUsers(fetchedUsers);
  }, []);

  // Sistema de filtro/busca em tempo real
  // Filtrar usuários baseado no termo de busca
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Se não há termo de busca, mostra todos os usuários
      setUsers(allUsers);
    } else {
      // Filtra usuários por nome ou email
      const filteredUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  }, [searchTerm, allUsers]);

  // Função para fazer logout e redirecionar para login
  const handleLogout = () => {
    logout(); // Clear user session
    router.push('/'); // Refresh the page to reflect the logout state
  };

  // Função para abrir modal de edição de usuário
  const handleUserUpdated = (user: User) => {
    setUserToEdit(user);
    setIsEditModalOpen(true);
  };

  // Função para recarregar dados após mudanças
  const handleRefreshData = () => {
    // Recarrega os dados dos usuários do localStorage
    const fetchedUsers = MockDatabase.getUsers();
    setAllUsers(fetchedUsers);
    setUsers(fetchedUsers);
  };

  // Função para fechar modal de edição
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  // Função para abrir modal de confirmação de exclusão
  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Função para fechar modal de exclusão
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Função chamada após exclusão bem-sucedida para atualizar a lista local
  const handleUserDeleted = (deletedUser: User) => {
    // Remover usuário da lista local e da lista completa
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== deletedUser.id));
    setAllUsers((prevUsers) =>
      prevUsers.filter((u) => u.id !== deletedUser.id)
    );
  };

  // Com o layout privado, sempre teremos um usuário aqui
  // O TypeScript não sabe disso, então usamos uma declaração para garantir que user não é null
  if (!user) return null; // Nunca deve acontecer por causa do layout

  return (
    <main className="bg-background min-h-screen">
      <Navbar onLogout={handleLogout} />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 px-4 py-6 sm:px-0">
          <section className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold md:text-4xl">
              Gerenciar Usuários
            </h1>
            <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
              Gerencie todos os usuários do sistema de forma centralizada.
              Adicione novos usuários, edite perfis existentes, configure
              permissões e mantenha o controle total sobre o acesso à
              plataforma.
            </p>
          </section>
          {/* Seção de controles e lista de usuários */}
          <section className="flex flex-col gap-4">
            {/* Barra de busca e botão de adicionar usuário */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="relative w-full flex-1 md:max-w-md">
                <Input
                  type="text"
                  placeholder="Filtrar por nome ou email do usuário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                type="button"
                onClick={() => router.push('/admin/create-user')}
                className="w-full md:w-sm"
              >
                <UserSearchIcon className="h-3 w-3" />
                Adicionar Usuário
              </Button>
            </div>

            {/* Container da lista de usuários */}
            <div className="rounded-md border">
              {/* Componente ListUsers - Renderiza tabela com usuários, ações de editar/excluir */}
              <ListUsers
                users={users}
                onEditUser={handleUserUpdated}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </section>
        </div>
      </div>

      {/* Modal de Edição de Usuário - Permite editar informações do usuário selecionado */}
      <EditUserModal
        isOpen={isEditModalOpen}
        user={userToEdit}
        onClose={handleCloseEditModal}
        onRefreshData={handleRefreshData}
      />

      {/* Modal de Confirmação de Exclusão - Confirma antes de remover usuário */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        user={userToDelete}
        onClose={handleCloseDeleteModal}
        onUserDeleted={handleUserDeleted}
      />
    </main>
  );
}
