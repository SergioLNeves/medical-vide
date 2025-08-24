// Tipos para as entidades do sistema

export type UserRole = 'paciente' | 'medico' | 'admin';

export interface ComplementInfo {
  // Campos comuns
  cpf?: string;
  rg?: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: string;

  // Campos específicos para paciente
  convenio?: string;
  contatoEmergencia?: string;

  // Campos específicos para médico
  crm?: string;
  especialidade?: string;
  formacao?: string;
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
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado';
  color?: 'blue' | 'green' | 'pink' | 'purple' | 'default';
  createdAt: string;
  updatedAt: string;
}
