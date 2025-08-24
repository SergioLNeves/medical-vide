'use client';

import { useState, useCallback, useEffect } from 'react';
import { MockDatabase, Schedule } from '@/mocks';

// Tipos específicos para agendamento
export interface Especialidade {
    id: string;
    nome: string;
    descricao?: string;
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

// Dados estáticos para especialidades e tratamentos
const mockEspecialidades: Especialidade[] = [
    { id: '1', nome: 'Cardiologia', descricao: 'Cuidados com o coração' },
    { id: '2', nome: 'Dermatologia', descricao: 'Cuidados com a pele' },
    { id: '3', nome: 'Neurologia', descricao: 'Cuidados com o sistema nervoso' },
    { id: '4', nome: 'Ortopedia', descricao: 'Cuidados com ossos e músculos' },
    { id: '5', nome: 'Pediatria', descricao: 'Cuidados com crianças' },
];

const mockTratamentos: Tratamento[] = [
    { id: '1', nome: 'Consulta Cardiológica', descricao: 'Avaliação geral do sistema cardiovascular', duracao: 60, preco: 200, medicoId: '1' },
    { id: '2', nome: 'Eletrocardiograma', descricao: 'Exame do ritmo cardíaco', duracao: 30, preco: 80, medicoId: '1' },
    { id: '3', nome: 'Consulta Dermatológica', descricao: 'Avaliação da pele e anexos', duracao: 45, preco: 180, medicoId: '3' },
    { id: '4', nome: 'Biópsia de Pele', descricao: 'Coleta de amostra para análise', duracao: 30, preco: 300, medicoId: '3' },
];

export function useAgendamento() {
    const [agendamentos, setAgendamentos] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(false);

    // Carrega agendamentos do MockDatabase
    useEffect(() => {
        const schedules = MockDatabase.getSchedules();
        setAgendamentos(schedules);
    }, []);

    const obterEspecialidadesDisponiveis = useCallback((): Especialidade[] => {
        return mockEspecialidades;
    }, []);

    const buscarMedicosPorEspecialidadeId = useCallback((especialidadeId: string): Medico[] => {
        const users = MockDatabase.getUsers();
        const medicos = users
            .filter(user => user.role === 'medico')
            .map(user => ({
                id: user.id,
                nome: user.name,
                especialidade: user.id === '1' ? 'Cardiologia' : 'Dermatologia',
                especialidadeId: user.id === '1' ? '1' : '2',
                crm: user.id === '1' ? '12345-SP' : '23456-SP',
                avaliacoes: user.id === '1' ? 4.8 : 4.9,
                telefone: `(11) 9999${user.id}-${user.id}${user.id}${user.id}${user.id}`,
                email: user.email
            }));

        return medicos.filter(medico => medico.especialidadeId === especialidadeId);
    }, []);

    const buscarMedicosPorNome = useCallback((nome: string): Medico[] => {
        const nomeNormalizado = nome.toLowerCase().trim();
        if (!nomeNormalizado) return [];

        const users = MockDatabase.getUsers();
        const medicos = users
            .filter(user => user.role === 'medico')
            .map(user => ({
                id: user.id,
                nome: user.name,
                especialidade: user.id === '1' ? 'Cardiologia' : 'Dermatologia',
                especialidadeId: user.id === '1' ? '1' : '2',
                crm: user.id === '1' ? '12345-SP' : '23456-SP',
                avaliacoes: user.id === '1' ? 4.8 : 4.9,
                telefone: `(11) 9999${user.id}-${user.id}${user.id}${user.id}${user.id}`,
                email: user.email
            }))
            .filter(medico => medico.nome.toLowerCase().includes(nomeNormalizado));

        return medicos;
    }, []);

    const buscarTratamentosPorMedico = useCallback((medicoId: string): Tratamento[] => {
        return mockTratamentos.filter(tratamento => tratamento.medicoId === medicoId);
    }, []);

    const criarAgendamento = useCallback(async (request: AgendamentoRequest): Promise<Schedule> => {
        setLoading(true);

        try {
            // Simula uma chamada de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Buscar informações necessárias
            const medico = MockDatabase.getUserByEmail('medico@test.com'); // Simplificado
            const tratamento = mockTratamentos.find(t => t.id === request.tratamentoId);
            const currentUser = MockDatabase.getCurrentUser();

            // Criar data/hora combinadas
            const startDateTime = new Date(`${request.data}T${request.horaInicio}:00`);
            const endDateTime = new Date(startDateTime.getTime() + (tratamento?.duracao || 60) * 60000);

            const novoAgendamento = MockDatabase.createSchedule({
                medicoId: request.medicoId,
                pacienteId: currentUser?.id || '4',
                medicoName: medico?.name || 'Médico',
                pacienteName: currentUser?.name || 'Paciente',
                start: startDateTime,
                end: endDateTime,
                title: `Consulta - ${currentUser?.name || 'Paciente'}`,
                description: tratamento?.descricao || 'Consulta médica',
                status: 'agendado',
                color: 'blue',
            });

            // Atualiza estado local
            setAgendamentos(prev => [...prev, novoAgendamento]);

            return novoAgendamento;
        } finally {
            setLoading(false);
        }
    }, []);

    const cancelarAgendamento = useCallback(async (agendamentoId: string): Promise<void> => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const success = MockDatabase.updateScheduleStatus(agendamentoId, 'cancelado');

            if (success) {
                // Atualiza estado local
                setAgendamentos(prev =>
                    prev.map(agendamento =>
                        agendamento.id === agendamentoId
                            ? { ...agendamento, status: 'cancelado', updatedAt: new Date().toISOString() }
                            : agendamento
                    )
                );
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const obterAgendamentosPaciente = useCallback((pacienteId: string): Schedule[] => {
        return MockDatabase.getSchedulesByPaciente(pacienteId);
    }, []);

    return {
        loading,
        agendamentos,
        obterEspecialidadesDisponiveis,
        buscarMedicosPorEspecialidadeId,
        buscarMedicosPorNome,
        buscarTratamentosPorMedico,
        criarAgendamento,
        obterAgendamentosPaciente,
        cancelarAgendamento,
    };
}
