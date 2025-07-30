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
import { MockDatabase } from '@/mocks';
import { User, UserRole } from '@/mocks/types';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onRefreshData: () => void;
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onRefreshData,
}: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user' as UserRole);

  // Update form values when user prop changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleConfirmEdit = () => {
    if (user) {
      // Validation to prevent empty values
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();

      if (!trimmedName || !trimmedEmail) {
        toast.error('Erro de validação', {
          description: 'Nome e email são obrigatórios',
        });
        return;
      }

      const success = MockDatabase.updateUser(
        user.id,
        trimmedName,
        trimmedEmail,
        role
      );

      if (success) {
        toast.success('Usuário atualizado com sucesso!', {
          description: `${trimmedName} foi atualizado no sistema`,
        });

        // Refresh the data and close modal
        onRefreshData();
        onClose();
      } else {
        toast.error('Erro ao atualizar usuário', {
          description: 'Usuário não encontrado no sistema',
        });
      }
    }
  };

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
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Altere os detalhes do usuário e salve as alterações. Nota-se que a
            edição de usuários não inclui alterações de dados sensíveis.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
