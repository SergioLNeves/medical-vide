'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { Schedule } from '@/mocks/types';
import { toast } from 'sonner';

interface CancelScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: Schedule | null;
    onConfirmCancel: (schedule: Schedule) => void;
    getDoctorName?: (userId: string) => string;
}

export default function CancelScheduleModal({
    isOpen,
    onClose,
    schedule,
    onConfirmCancel,
    getDoctorName,
}: CancelScheduleModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!schedule) return null;

    // Função para formatar horário
    const formatTime = (date: Date | string) => {
        return format(new Date(date), 'HH:mm', { locale: ptBR });
    };

    // Função para formatar data
    const formatDate = (date: Date | string) => {
        return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    // Obter nome do médico
    const doctorName = getDoctorName
        ? getDoctorName(schedule.medicoId)
        : schedule.medicoName || 'Médico não encontrado';

    const handleConfirmCancel = async () => {
        try {
            setIsLoading(true);
            await onConfirmCancel(schedule);
            toast.success('Consulta cancelada com sucesso!');
            onClose();
        } catch (error) {
            toast.error('Erro ao cancelar consulta. Tente novamente.');
            console.error('Erro ao cancelar:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangleIcon className="h-5 w-5" />
                        Cancelar Consulta
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-700 mb-3">
                            <strong>Atenção:</strong> Você está prestes a cancelar a seguinte consulta:
                        </p>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4 text-red-500" />
                                <span><strong>Data:</strong> {formatDate(schedule.start)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="h-4 w-4 text-red-500" />
                                <span>
                                    <strong>Horário:</strong> {formatTime(schedule.start)} - {formatTime(schedule.end)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4 text-red-500" />
                                <span><strong>Médico:</strong> {doctorName}</span>
                            </div>
                            <div className="mt-2">
                                <span><strong>Consulta:</strong> {schedule.title}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            <strong>Importante:</strong> Esta ação não pode ser desfeita.
                            Você precisará reagendar se desejar uma nova consulta.
                        </p>
                    </div>

                    <p className="text-sm text-gray-600">
                        Tem certeza de que deseja cancelar esta consulta?
                    </p>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Manter Consulta
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirmCancel}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cancelando...' : 'Sim, Cancelar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
