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
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sistema de dados mockados e tipos
import { MockDatabase } from '@/mocks';
import { User, UserRole } from '@/mocks/types';

// Toast para notificações do usuário
import { toast } from 'sonner';

// React hooks para estado e efeitos
import { useState, useEffect } from 'react';

// Ícones do Lucide React
import { ChevronDownIcon } from 'lucide-react';

// Interface TypeScript definindo as props do modal de edição
interface EditUserModalProps {
  isOpen: boolean; // Controla se o modal está visível
  user: User | null; // Dados do usuário a ser editado (null quando fechado)
  onClose: () => void; // Callback para fechar o modal
  onRefreshData: () => void; // Callback para atualizar dados após edição
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onRefreshData,
}: EditUserModalProps) {
  // Estados para armazenar os dados do formulário de edição
  const [name, setName] = useState(''); // Nome do usuário
  const [email, setEmail] = useState(''); // Email do usuário  
  const [role, setRole] = useState<UserRole>('user' as UserRole); // Função/role do usuário

  // Atualiza os valores do formulário quando o prop user é alterado
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  // Função principal para confirmar e processar a edição do usuário
  const handleConfirmEdit = () => {
    if (user) {
      // Validação básica: remove espaços em branco dos campos
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();

      // Verifica se os campos obrigatórios não estão vazios
      if (!trimmedName || !trimmedEmail) {
        toast.error('Erro de validação', {
          description: 'Nome e email são obrigatórios',
        });
        return;
      }

      // Atualiza o usuário no MockDatabase
      const success = MockDatabase.updateUser(
        user.id,
        trimmedName,
        trimmedEmail,
        role
      );

      // Processa o resultado da atualização
      if (success) {
        toast.success('Usuário atualizado com sucesso!', {
          description: `${trimmedName} foi atualizado no sistema`,
        });

        // Atualiza os dados na página pai e fecha o modal
        onRefreshData();
        onClose();
      } else {
        toast.error('Erro ao atualizar usuário', {
          description: 'Usuário não encontrado no sistema',
        });
      }
    }
  };

  // Função utilitária para converter roles técnicos em nomes amigáveis
  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'medico':
        return 'Médico';
      case 'paciente':
        return 'Usuário';
      default:
        return 'Selecione uma função';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {/* Cabeçalho do modal com título e descrição */}
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere os detalhes do usuário e salve as alterações. Nota-se que a
            edição de usuários não inclui alterações de dados sensíveis.
          </DialogDescription>
        </DialogHeader>

        {/* Formulário de edição com campos de entrada */}
        <div className="mt-4 space-y-4">
          {/* Campo de nome do usuário */}
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Campo de email do usuário */}
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Dropdown para seleção de função/role */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between text-left font-normal"
              >
                {getRoleDisplayName(role)}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuItem onClick={() => setRole('admin')}>
                Administrador
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('medico')}>
                Médico
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole('paciente')}>
                Usuário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Rodapé do modal com botões de ação */}
        <DialogFooter>
          <Button onClick={handleConfirmEdit}>Salvar</Button>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
