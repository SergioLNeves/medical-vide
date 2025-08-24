'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/navbar';
import CardFunction from '@/components/card-function/card-function';
import ListPatientSchedules from './_components/list-patient-schedules';
import CancelScheduleModal from './_components/cancel-schedule-modal';
import ScheduleDetailsModal from './_components/schedule-details-modal';
import { MockDatabase } from '@/mocks/database';
import { Schedule } from '@/mocks/types';
import { Calendar, UserCog2 } from 'lucide-react';

export default function DashboardPacientePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Carregar agendamentos do paciente
  useEffect(() => {
    if (user) {
      MockDatabase.initialize();

      const loadSchedules = () => {
        const patientSchedules = MockDatabase.getSchedulesByPaciente(user.id);
        setSchedules(patientSchedules);
      };

      loadSchedules();

      // Escutar mudanças no localStorage
      const handleStorageChange = () => {
        loadSchedules();
      };

      // Escutar evento customizado de novo agendamento
      const handleNewSchedule = (event: CustomEvent) => {
        const newSchedule = event.detail;
        if (newSchedule.pacienteId === user.id) {
          loadSchedules();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener(
        'scheduleCreated',
        handleNewSchedule as EventListener
      );

      // Atualizar a cada 5 segundos para sincronizar
      const interval = setInterval(loadSchedules, 5000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener(
          'scheduleCreated',
          handleNewSchedule as EventListener
        );
        clearInterval(interval);
      };
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Função para buscar nome do médico
  const getDoctorName = (userId: string) => {
    const users = MockDatabase.getUsers();
    const doctor = users.find((user: { id: string; name?: string }) => user.id === userId);
    return doctor?.name || 'Médico não encontrado';
  };

  // Função para visualizar detalhes do agendamento
  const handleViewSchedule = (schedule: Schedule) => {
    console.log('View schedule details:', schedule);
    setSelectedSchedule(schedule);
    setIsDetailsModalOpen(true);
  };

  // Função para abrir modal de cancelamento
  const handleCancelSchedule = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsCancelModalOpen(true);
  };

  // Função para confirmar cancelamento
  const handleConfirmCancel = async (schedule: Schedule) => {
    // Atualizar status do agendamento para "cancelado"
    const success = MockDatabase.updateScheduleStatus(schedule.id, 'cancelado');

    if (success) {
      // Recarregar lista de agendamentos
      const patientSchedules = MockDatabase.getSchedulesByPaciente(user!.id);
      setSchedules(patientSchedules);
    } else {
      throw new Error('Falha ao cancelar agendamento');
    }
  };

  // Função para fechar modal de cancelamento
  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedSchedule(null);
  };

  // Função para fechar modal de detalhes
  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedSchedule(null);
  };

  // Com o layout privado, sempre teremos um usuário aqui
  // O TypeScript não sabe disso, então usamos uma declaração para garantir que user não é null
  if (!user) return null; // Nunca deve acontecer por causa do layout

  return (
    <main className="bg-background min-h-screen">
      <Navbar onLogout={handleLogout} />
      <section className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 px-4 py-6 sm:px-0">
          {/* Cards de ação */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CardFunction
              icon={<Calendar />}
              title="Agendar Consulta"
              onClick={() => router.push(`/${user.role}/schedule`)}
              buttonText=" Agendar"
              description="Marque sua consulta"
            />
            <CardFunction
              icon={<UserCog2 />}
              title="Configurações do Perfil"
              onClick={() => router.push('/paciente/complement-info')}
              description="Edite suas informações pessoais"
              buttonText=" Editar Perfil"
            />
          </div>
          {/* Listagem de agendamentos */}
          <section id="agendamentos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Meus Agendamentos</h2>
            </div>

            <div className="rounded-md border">
              <ListPatientSchedules
                schedules={schedules}
                onViewSchedule={handleViewSchedule}
                onCancelSchedule={handleCancelSchedule}
                getDoctorName={getDoctorName}
              />
            </div>
          </section>
        </div>
      </section>

      {/* Modal de cancelamento */}
      <CancelScheduleModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        schedule={selectedSchedule}
        onConfirmCancel={handleConfirmCancel}
        getDoctorName={getDoctorName}
      />

      {/* Modal de detalhes */}
      <ScheduleDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        schedule={selectedSchedule}
        getDoctorName={getDoctorName}
      />
    </main>
  );
}
