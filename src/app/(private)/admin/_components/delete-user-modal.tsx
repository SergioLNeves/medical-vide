'use client';

// Tipos do sistema de dados mockados
import { User } from '@/mocks/types';
import { MockDatabase } from '@/mocks/database';

// Componentes de UI do shadcn/ui
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Toast para notificações do usuário
import { toast } from 'sonner';

// Interface TypeScript definindo as props do modal de exclusão
interface DeleteUserModalProps {
  isOpen: boolean; // Controla se o modal está visível
  user: User | null; // Dados do usuário a ser excluído (null quando fechado)
  onClose: () => void; // Callback para fechar o modal
  onUserDeleted: (deletedUser: User) => void; // Callback executado após exclusão bem-sucedida
}

export default function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onUserDeleted,
}: DeleteUserModalProps) {
  // Função principal para confirmar e processar a exclusão do usuário
  const handleConfirmDelete = () => {
    if (user) {
      // Remove o usuário do localStorage usando MockDatabase
      const success = MockDatabase.deleteUser(user.id);

      // Processa o resultado da exclusão
      if (success) {
        toast.success('Usuário deletado com sucesso!', {
          description: `${user.name} foi removido do sistema`,
        });

        console.log(`User ${user.name} deleted successfully`);

        // Notifica o componente pai sobre a exclusão bem-sucedida
        onUserDeleted(user);
      } else {
        toast.error('Erro ao deletar usuário', {
          description: 'Usuário não encontrado no sistema',
        });
      }
    }

    // Fecha o modal independentemente do resultado
    onClose();
  };

  // Função para cancelar a operação de exclusão
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Cabeçalho do modal com título e aviso de confirmação */}
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja deletar o usuário{' '}
            <strong>{user?.name}</strong>?
            <br />
            <span className="mt-2 block text-xs text-red-600">
              Esta ação não pode ser desfeita.
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Rodapé do modal com botões de cancelamento e confirmação */}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmDelete}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
