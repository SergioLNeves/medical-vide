import { User } from './types';

// Mock data - usuários pré-cadastrados (médicos e admins)
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'medico@test.com',
    password: '123456',
    name: 'Dr. João Silva',
    role: 'medico',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    email: 'admin@test.com',
    password: '123456',
    name: 'Admin Sistema',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    email: 'medico2@test.com',
    password: '123456',
    name: 'Dra. Maria Santos',
    role: 'medico',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '4',
    email: 'paciente@test.com',
    password: '123456',
    name: 'Carlos Oliveira',
    role: 'paciente',
    complementInfo: {
      // Mock default - informações básicas após primeiro login
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123 - São Paulo, SP',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '5',
    email: 'paciente.completo@test.com',
    password: '123456',
    name: 'Ana Paula Costa',
    role: 'paciente',
    complementInfo: {
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      convenio: 'Unimed Premium',
      telefone: '(11) 98888-7777',
      endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo, SP',
      dataNascimento: '1985-03-15',
      contatoEmergencia: 'João Costa (marido) - (11) 97777-6666',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '6',
    email: 'paciente.basico@test.com',
    password: '123456',
    name: 'Pedro Santos',
    role: 'paciente',
    complementInfo: {
      cpf: '987.654.321-00',
      telefone: '(11) 96666-5555',
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];
