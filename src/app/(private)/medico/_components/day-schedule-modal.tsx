'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { MockDatabase } from '@/mocks/database';
import { Schedule } from '@/mocks/types';
import { toast } from 'sonner';

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
  const [daySchedules, setDaySchedules] = useState<Schedule[]>([]);

  const loadDaySchedules = useCallback(() => {
    if (!selectedDate || !medicoId) return;

    // Buscar agendamentos do médico no localStorage
    const allSchedules = MockDatabase.getSchedulesByMedico(medicoId);

    // Filtrar consultas do dia selecionado
    const filtered = allSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start);
      return scheduleDate.toDateString() === selectedDate.toDateString();
    });

    // Verificar e atualizar consultas vencidas automaticamente
    const now = new Date();
    filtered.forEach((schedule) => {
      if (
        new Date(schedule.end) < now &&
        (schedule.status === 'agendado' || schedule.status === 'confirmado')
      ) {
        MockDatabase.updateScheduleStatus(schedule.id, 'realizado');
      }
    });

    // Recarregar após possíveis atualizações
    const updatedSchedules = MockDatabase.getSchedulesByMedico(medicoId);
    const updatedFiltered = updatedSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start);
      return scheduleDate.toDateString() === selectedDate.toDateString();
    });

    setDaySchedules(updatedFiltered);
  }, [selectedDate, medicoId]);

  useEffect(() => {
    if (selectedDate && medicoId) {
      loadDaySchedules();

      // Escutar evento customizado de agendamento atualizado
      const handleUpdatedSchedule = (event: CustomEvent) => {
        const updatedSchedule = event.detail;
        if (updatedSchedule.medicoId === medicoId) {
          loadDaySchedules();
        }
      };

      window.addEventListener(
        'scheduleUpdated',
        handleUpdatedSchedule as EventListener
      );

      return () => {
        window.removeEventListener(
          'scheduleUpdated',
          handleUpdatedSchedule as EventListener
        );
      };
    }
  }, [selectedDate, medicoId, isOpen, loadDaySchedules]);

  // Função para confirmar agendamento
  const handleConfirmSchedule = async (schedule: Schedule) => {
    try {
      const success = MockDatabase.updateScheduleStatus(
        schedule.id,
        'confirmado'
      );

      if (success) {
        toast.success('Consulta confirmada com sucesso!');
      } else {
        throw new Error('Falha ao confirmar agendamento');
      }
    } catch (error) {
      toast.error('Erro ao confirmar consulta. Tente novamente.');
      console.error('Erro ao confirmar agendamento:', error);
    }
  };

  // Função para cancelar agendamento
  const handleCancelSchedule = async (schedule: Schedule) => {
    try {
      const success = MockDatabase.updateScheduleStatus(
        schedule.id,
        'cancelado'
      );

      if (success) {
        toast.success('Consulta cancelada com sucesso!');
      } else {
        throw new Error('Falha ao cancelar agendamento');
      }
    } catch (error) {
      toast.error('Erro ao cancelar consulta. Tente novamente.');
      console.error('Erro ao cancelar agendamento:', error);
    }
  };

  // Verificar se pode confirmar uma consulta
  const canConfirm = (schedule: Schedule) => {
    return schedule.status === 'agendado';
  };

  // Verificar se pode cancelar uma consulta
  const canCancel = (schedule: Schedule) => {
    return schedule.status === 'agendado' || schedule.status === 'confirmado';
  };

  // Verificar se a consulta já passou da data
  const isPastDue = (schedule: Schedule) => {
    const now = new Date();
    const scheduleDate = new Date(schedule.start);
    return scheduleDate < now;
  };

  if (!selectedDate) return null;

  // Função para obter nome do paciente
  const getPatientName = (pacienteId: string) => {
    const users = MockDatabase.getUsers();
    const patient = users.find((user: { id: string; name?: string }) => user.id === pacienteId);
    return patient?.name || 'Paciente não encontrado';
  };

  // Função para formatar horário
  const formatTime = (date: Date) => {
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
    return (
      statusColorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200'
    );
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
                      <TableHead>Ações</TableHead>
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
                            <Badge
                              className={getStatusColor(schedule.status)}
                              variant="outline"
                            >
                              {getStatusText(schedule.status)}
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
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {/* Botão de confirmar */}
                              {canConfirm(schedule) && !isPastDue(schedule) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleConfirmSchedule(schedule)
                                  }
                                  className="border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Confirmar
                                </Button>
                              )}

                              {/* Botão de cancelar */}
                              {canCancel(schedule) && !isPastDue(schedule) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCancelSchedule(schedule)}
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Cancelar
                                </Button>
                              )}

                              {/* Indicador de consulta passada */}
                              {isPastDue(schedule) &&
                                schedule.status !== 'realizado' &&
                                schedule.status !== 'cancelado' && (
                                  <span className="text-xs text-gray-500 italic">
                                    Consulta vencida
                                  </span>
                                )}

                              {/* Sem ações disponíveis */}
                              {(!canConfirm(schedule) &&
                                !canCancel(schedule)) ||
                                isPastDue(schedule) ? (
                                <span className="text-xs text-gray-400">-</span>
                              ) : null}
                            </div>
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
