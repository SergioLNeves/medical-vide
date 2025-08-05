// Tipos para as entidades do sistema

export type UserRole = 'paciente' | 'medico' | 'admin';

export interface ComplementInfo {
  cpf?: string;
  rg?: string;
  convenio?: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;
  contatoEmergencia?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  complementInfo?: ComplementInfo;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  medicoId: string;
  pacienteId: string;
  medicoName: string;
  pacienteName: string;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  status: 'agendado' | 'realizado' | 'cancelado';
  color?: 'blue' | 'green' | 'pink' | 'purple' | 'default';
  createdAt: string;
  updatedAt: string;
}
