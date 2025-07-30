'use client';

import { User } from '@/mocks/types';
import { MockDatabase } from '@/mocks/database';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface DeleteUserModalProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onUserDeleted: (deletedUser: User) => void;
}

export default function DeleteUserModal({
    isOpen,
    user,
    onClose,
    onUserDeleted,
}: DeleteUserModalProps) {
    const handleConfirmDelete = () => {
        if (user) {
            // Deletar usuário do localStorage usando MockDatabase
            const success = MockDatabase.deleteUser(user.id);

            if (success) {
                toast.success('Usuário deletado com sucesso!', {
                    description: `${user.name} foi removido do sistema`,
                });

                console.log(`User ${user.name} deleted successfully`);

                // Notifica o componente pai que o usuário foi deletado
                onUserDeleted(user);
            } else {
                toast.error('Erro ao deletar usuário', {
                    description: 'Usuário não encontrado no sistema',
                });
            }
        }

        // Fechar modal
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
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
