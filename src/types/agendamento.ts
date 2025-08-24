export interface Especialidade {
    id: string;
    nome: string;
    descricao?: string;
}

export interface Medico {
    id: string;
    nome: string;
    especialidade: string;
    especialidadeId: string;
    crm: string;
    avaliacoes?: number;
    telefone?: string;
    email?: string;
}

export interface Tratamento {
    id: string;
    nome: string;
    descricao: string;
    duracao: number; // em minutos
    preco?: number;
    medicoId: string;
}

export interface AgendamentoRequest {
    medicoId: string;
    tratamentoId: string;
    data: string; // formato YYYY-MM-DD
    horaInicio: string; // formato HH:mm
}

export interface Agendamento extends AgendamentoRequest {
    id: string;
    pacienteId: string;
    status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
    observacoes?: string;
    createdAt: string;
    updatedAt: string;
}
