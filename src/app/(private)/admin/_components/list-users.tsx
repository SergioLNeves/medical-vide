// Componentes de UI do shadcn/ui
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Tipos do sistema
import { User } from '@/mocks/types';

// Ícones do Lucide React para ações dos usuários
import { UserRoundCog, UserX2Icon } from 'lucide-react';

// Interface TypeScript definindo as props do componente de listagem
type ListUsersProps = {
  users: User[]; // Array de usuários para exibição na tabela
  onEditUser: (user: User) => void; // Callback executado quando usuário clica em editar
  onDeleteUser: (user: User) => void; // Callback executado quando usuário clica em excluir
};

// Função utilitária para determinar a variante do badge baseada no role
const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'medico':
      return 'default'; // Badge padrão para médicos
    case 'admin':
      return 'info'; // Badge informativo para administradores
    default:
      return 'secondary'; // Badge secundário para pacientes e outros
  }
};

export default function ListUsers({
  users,
  onEditUser,
  onDeleteUser,
}: ListUsersProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Email
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Role
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-muted/50">
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                {user.name}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                {user.email}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => onEditUser(user)}
                  >
                    <UserRoundCog className="h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteUser(user)}
                  >
                    <UserX2Icon className="h-3 w-3" />
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
