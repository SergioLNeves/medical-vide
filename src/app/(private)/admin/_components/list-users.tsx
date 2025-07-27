import { User } from '@/mocks/types';
import { UserRoundCog } from 'lucide-react';

type ListUsersProps = {
    users: User[];
}


export default function ListUsers({ users }: ListUsersProps) {
    return (
        <table className="w-full">
            <thead className="border-b bg-muted/50">
                <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">{user.name}</td>
                        <td className="px-4 py-3 text-sm">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                {user.role}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                                <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                                    <UserRoundCog className="h-3 w-3" />
                                    Editar
                                </button>
                                <button className="inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90">
                                    Excluir
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}