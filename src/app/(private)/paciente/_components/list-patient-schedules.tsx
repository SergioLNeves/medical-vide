'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/mocks/types';
import { CalendarIcon, ClockIcon, UserIcon, Eye, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface TypeScript definindo as props do componente de listagem
type ListPatientSchedulesProps = {
  schedules: Schedule[]; // Array de agendamentos para exibição na tabela
  onViewSchedule?: (schedule: Schedule) => void; // Callback executado quando usuário clica em visualizar
  onCancelSchedule?: (schedule: Schedule) => void; // Callback executado quando usuário clica em cancelar
  getDoctorName?: (userId: string) => string; // Função para buscar nome do médico
};

// Função utilitária para determinar a cor do badge baseada no status
const getStatusColor = (status: string) => {
  const statusColorMap: Record<string, string> = {
    agendado: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmado: 'bg-green-100 text-green-800 border-green-200',
    cancelado: 'bg-red-100 text-red-800 border-red-200',
    realizado: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return (
    statusColorMap[status.toLowerCase()] ||
    'bg-gray-100 text-gray-800 border-gray-200'
  );
};

export default function ListPatientSchedules({
  schedules,
  onViewSchedule,
  onCancelSchedule,
  getDoctorName,
}: ListPatientSchedulesProps) {
  const formatTime = (date: Date | string) => {
    return format(new Date(date), 'HH:mm', { locale: ptBR });
  };

  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  };

  // Verificar se agendamento pode ser cancelado (não está realizado ou cancelado)
  const canCancel = (schedule: Schedule) => {
    const status = schedule.status.toLowerCase();
    return status !== 'realizado' && status !== 'cancelado';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Data/Hora
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Médico
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Consulta
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">
              Descrição
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {schedules.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-8 text-center text-sm text-gray-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <CalendarIcon className="h-8 w-8 text-gray-400" />
                  <p>Nenhum agendamento encontrado</p>
                  <p className="text-xs text-gray-400">
                    Você ainda não possui consultas agendadas
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            schedules
              .sort(
                (a, b) =>
                  new Date(a.start).getTime() - new Date(b.start).getTime()
              )
              .map((schedule) => (
                <tr key={schedule.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {formatDate(schedule.start)}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <ClockIcon className="h-3 w-3" />
                          <span className="text-xs">
                            {formatTime(schedule.start)} -{' '}
                            {formatTime(schedule.end)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      <span>
                        {getDoctorName
                          ? getDoctorName(schedule.medicoId)
                          : schedule.medicoName || 'Médico'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {schedule.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className={getStatusColor(schedule.status)}
                    >
                      {schedule.status}
                    </Badge>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-sm">
                    <div
                      className="truncate"
                      title={schedule.description || ''}
                    >
                      {schedule.description ? (
                        <span className="text-gray-600">
                          {schedule.description}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">
                          Sem descrição
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      {onViewSchedule && (
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => onViewSchedule(schedule)}
                        >
                          <Eye className="h-3 w-3" />
                          Detalhes
                        </Button>
                      )}
                      {onCancelSchedule && canCancel(schedule) && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => onCancelSchedule(schedule)}
                        >
                          <XCircle className="h-3 w-3" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
