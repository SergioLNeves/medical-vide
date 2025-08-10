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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { mockSchedules } from '@/mocks/schedule';
import { mockUsers } from '@/mocks/users';

interface DayScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  medicoId: string;
}

export default function DayScheduleModal({
  isOpen,
  onClose,
  selectedDate,
  medicoId,
}: DayScheduleModalProps) {
  if (!selectedDate) return null;

  // Filtrar consultas do dia selecionado para o médico logado
  const daySchedules = mockSchedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.start);
    return (
      schedule.medicoId === medicoId &&
      scheduleDate.toDateString() === selectedDate.toDateString()
    );
  });

  // Função para obter nome do paciente
  const getPatientName = (pacienteId: string) => {
    const patient = mockUsers.find((user) => user.id === pacienteId);
    return patient?.name || 'Paciente não encontrado';
  };

  // Função para formatar horário
  const formatTime = (date: Date) => {
    return format(new Date(date), 'HH:mm', { locale: ptBR });
  };

  // Função para obter cor do status
  const getStatusColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      pink: 'bg-pink-100 text-pink-800',
      purple: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800',
    };
    return colorMap[color || 'default'] || colorMap.default;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-3xl overflow-auto md:min-w-2/4"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Consultas do dia{' '}
            {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {daySchedules.length === 0 ? (
            <div className="py-8 text-center">
              <CalendarIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-lg text-gray-500">
                Nenhuma consulta agendada para este dia
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Você pode agendar novas consultas através do sistema
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {daySchedules.length} consulta
                  {daySchedules.length !== 1 ? 's' : ''} agendada
                  {daySchedules.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Horário</TableHead>
                      <TableHead>Consulta</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {daySchedules
                      .sort(
                        (a, b) =>
                          new Date(a.start).getTime() -
                          new Date(b.start).getTime()
                      )
                      .map((schedule) => (
                        <TableRow
                          key={schedule.id}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4 text-gray-500" />
                              <span>
                                {formatTime(schedule.start)} -{' '}
                                {formatTime(schedule.end)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-gray-900">
                              {schedule.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-4 w-4 text-gray-500" />
                              <span>{getPatientName(schedule.pacienteId)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(schedule.color)}>
                              {schedule.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {schedule.description ? (
                              <span className="text-sm text-gray-600">
                                {schedule.description}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400 italic">
                                Sem descrição
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
