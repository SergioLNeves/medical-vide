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
    complementInfo?: ComplementInfo
    createdAt: string;
    updatedAt: string;
}

export interface Agenda {
    id: string;
    userEmail: string; // Foreign key para User.email
    title: string;
    description?: string;
    date: string; // ISO date string
    time: string; // formato HH:mm
    status: 'agendado' | 'confirmado' | 'cancelado' | 'concluido';
    medicoEmail?: string; // Email do médico responsável (se aplicável)
    createdAt: string;
    updatedAt: string;
}

// Tipos para operações do localStorage
export interface DatabaseTables {
    users: User[];
    agendas: Agenda[];
}
