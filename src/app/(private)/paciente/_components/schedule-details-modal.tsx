'use client';

import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/mocks/types';
import {
    Calendar,
    Clock,
    User,
    Stethoscope,
    FileText,
    X
} from 'lucide-react';

interface ScheduleDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    schedule: Schedule | null;
    getDoctorName?: (userId: string) => string;
}

export default function ScheduleDetailsModal({
    isOpen,
    onClose,
    schedule,
    getDoctorName,
}: ScheduleDetailsModalProps) {
    if (!schedule) return null;

    // Função para formatar data
    const formatDate = (date: Date | string) => {
        return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    };

    // Função para formatar horário
    const formatTime = (date: Date | string) => {
        return format(new Date(date), 'HH:mm', { locale: ptBR });
    };

    // Função para obter cor do status
    const getStatusColor = (status: string) => {
        const statusColorMap: Record<string, string> = {
            agendado: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            confirmado: 'bg-green-100 text-green-800 border-green-200',
            cancelado: 'bg-red-100 text-red-800 border-red-200',
            realizado: 'bg-blue-100 text-blue-800 border-blue-200',
        };
        return statusColorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    // Função para obter texto do status
    const getStatusText = (status: string) => {
        const statusTextMap: Record<string, string> = {
            agendado: 'Agendado',
            confirmado: 'Confirmado',
            cancelado: 'Cancelado',
            realizado: 'Realizado',
        };
        return statusTextMap[status] || status;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader className="border-b pb-4">
                    <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Detalhes da Consulta
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute right-4 top-4 hover:bg-gray-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Informações principais */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Data e horário */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Calendar className="h-4 w-4" />
                                Data
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                {formatDate(schedule.start)}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <Clock className="h-4 w-4" />
                                Horário
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                {formatTime(schedule.start)} - {formatTime(schedule.end)}
                            </div>
                        </div>
                    </div>

                    {/* Médico */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <User className="h-4 w-4" />
                            Médico
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {getDoctorName ? getDoctorName(schedule.medicoId) : schedule.medicoName}
                        </div>
                    </div>

                    {/* Tipo de consulta */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Stethoscope className="h-4 w-4" />
                            Tipo de Consulta
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                            {schedule.title}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            Status
                        </div>
                        <div>
                            <Badge className={getStatusColor(schedule.status)} variant="outline">
                                {getStatusText(schedule.status)}
                            </Badge>
                        </div>
                    </div>

                    {/* Descrição */}
                    {schedule.description && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                <FileText className="h-4 w-4" />
                                Descrição
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 text-gray-700">
                                {schedule.description}
                            </div>
                        </div>
                    )}

                    {/* Informações adicionais */}
                    <div className="border-t pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                            <div>
                                <span className="font-medium">Criado em:</span>{' '}
                                {format(new Date(schedule.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                            </div>
                            {schedule.updatedAt !== schedule.createdAt && (
                                <div>
                                    <span className="font-medium">Atualizado em:</span>{' '}
                                    {format(new Date(schedule.updatedAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="border-t pt-4 flex justify-end">
                    <Button onClick={onClose} variant="outline">
                        Fechar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
