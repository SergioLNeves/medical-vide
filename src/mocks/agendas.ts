import { Agenda } from './types';

// Mock data - agendas pré-cadastradas para demonstração
export const mockAgendas: Agenda[] = [
  {
    id: '1',
    userEmail: 'paciente@example.com',
    title: 'Consulta Cardiologia',
    description: 'Consulta de rotina cardiológica',
    date: '2025-07-01',
    time: '09:00',
    status: 'agendado',
    medicoEmail: 'medico@example.com',
    createdAt: '2024-06-15T00:00:00.000Z',
    updatedAt: '2024-06-15T00:00:00.000Z',
  },
  {
    id: '2',
    userEmail: 'paciente@example.com',
    title: 'Exame de Sangue',
    description: 'Coleta para exames laboratoriais',
    date: '2025-07-03',
    time: '08:30',
    status: 'confirmado',
    createdAt: '2024-06-16T00:00:00.000Z',
    updatedAt: '2024-06-20T00:00:00.000Z',
  },
  {
    id: '3',
    userEmail: 'paciente@example.com',
    title: 'Consulta Dermatologia',
    description: 'Avaliação dermatológica preventiva',
    date: '2025-07-05',
    time: '14:00',
    status: 'agendado',
    medicoEmail: 'medico2@example.com',
    createdAt: '2024-06-18T00:00:00.000Z',
    updatedAt: '2024-06-18T00:00:00.000Z',
  },
];
