import { Schedule } from './types';

export const mockSchedules: Schedule[] = [
    {
        id: '1',
        medicoId: '1', // Dr. João Silva
        pacienteId: '4', // Carlos Oliveira
        medicoName: 'Dr. João Silva',
        pacienteName: 'Carlos Oliveira',
        start: new Date('2025-08-04T09:00:00'),
        end: new Date('2025-08-04T10:00:00'),
        title: 'Consulta - Carlos Oliveira',
        description: 'Consulta de rotina',
        status: 'agendado',
        color: 'blue',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        medicoId: '1', // Dr. João Silva
        pacienteId: '5', // Ana Paula Costa
        medicoName: 'Dr. João Silva',
        pacienteName: 'Ana Paula Costa',
        start: new Date('2025-08-04T14:00:00'),
        end: new Date('2025-08-04T15:00:00'),
        title: 'Consulta - Ana Paula Costa',
        description: 'Acompanhamento médico',
        status: 'agendado',
        color: 'green',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        medicoId: '1', // Dr. João Silva
        pacienteId: '6', // Pedro Santos
        medicoName: 'Dr. João Silva',
        pacienteName: 'Pedro Santos',
        start: new Date('2025-08-05T10:30:00'),
        end: new Date('2025-08-05T11:30:00'),
        title: 'Consulta - Pedro Santos',
        description: 'Primeira consulta',
        status: 'agendado',
        color: 'purple',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        medicoId: '1', // Dr. João Silva
        pacienteId: '4', // Carlos Oliveira
        medicoName: 'Dr. João Silva',
        pacienteName: 'Carlos Oliveira',
        start: new Date('2025-08-06T16:00:00'),
        end: new Date('2025-08-06T17:00:00'),
        title: 'Retorno - Carlos Oliveira',
        description: 'Consulta de retorno',
        status: 'agendado',
        color: 'pink',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '5',
        medicoId: '3', // Dra. Maria Santos
        pacienteId: '5', // Ana Paula Costa
        medicoName: 'Dra. Maria Santos',
        pacienteName: 'Ana Paula Costa',
        start: new Date('2025-08-07T08:00:00'),
        end: new Date('2025-08-07T09:00:00'),
        title: 'Exame - Ana Paula Costa',
        description: 'Análise de exames',
        status: 'agendado',
        color: 'blue',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '6',
        medicoId: '1', // Dr. João Silva
        pacienteId: '6', // Pedro Santos
        medicoName: 'Dr. João Silva',
        pacienteName: 'Pedro Santos',
        start: new Date('2025-08-08T11:00:00'),
        end: new Date('2025-08-08T12:00:00'),
        title: 'Retorno - Pedro Santos',
        description: 'Consulta de acompanhamento',
        status: 'realizado',
        color: 'green',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
