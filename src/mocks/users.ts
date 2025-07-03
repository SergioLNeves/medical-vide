import { User } from './types';

// Mock data - usuários pré-cadastrados (médicos e admins)
export const mockUsers: User[] = [
    {
        id: '1',
        email: 'medico@example.com',
        password: '123456',
        name: 'Dr. João Silva',
        role: 'medico',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: '2',
        email: 'admin@example.com',
        password: '123456',
        name: 'Admin Sistema',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: '3',
        email: 'medico2@example.com',
        password: '123456',
        name: 'Dra. Maria Santos',
        role: 'medico',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    },
    {
        id: '4',
        email: 'paciente@example.com',
        password: '123456',
        name: 'Carlos Oliveira',
        role: 'paciente',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }
];
