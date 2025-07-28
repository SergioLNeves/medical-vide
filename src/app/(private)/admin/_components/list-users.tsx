import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User } from '@/mocks/types';
import { UserRoundCog, UserX2Icon } from 'lucide-react';

type ListUsersProps = {
    users: User[];
    onEditUser: (user: User) => void;
    onDeleteUser: (user: User) => void;
}

const getRoleBadgeVariant = (role: string) => {
    switch (role) {
        case 'medico': return 'default'
        case 'admin': return 'info'
        default: return 'secondary'
    }
}

export default function ListUsers({ users, onEditUser, onDeleteUser }: ListUsersProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px]">
                <thead className="border-b bg-muted/50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Nome</th>
                        <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Role</th>
                        <th className="px-4 py-3 text-right text-sm font-medium whitespace-nowrap">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                            <td className="px-4 py-3 text-sm whitespace-nowrap">{user.name}</td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                                <Badge variant={getRoleBadgeVariant(user.role)}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type='button'
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => onEditUser(user)}>
                                        <UserRoundCog className="h-3 w-3" />
                                        Editar
                                    </Button>
                                    <Button
                                        type='button'
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDeleteUser(user)}>
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
    )
}