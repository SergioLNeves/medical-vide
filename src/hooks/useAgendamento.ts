'use client';

import { useState, useCallback, useEffect } from 'react';
import { MockDatabase, Schedule } from '@/mocks';
import { especialidadesDisponiveis } from '@/constants/especialidades';

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
const mockEspecialidades: Especialidade[] = especialidadesDisponiveis.map(
  (esp) => ({
    id: esp.id,
    nome: esp.nome,
    descricao: `Cuidados especializados em ${esp.nome.toLowerCase()}`,
  })
);

const mockTratamentos: Tratamento[] = [
  // Tratamentos genéricos que podem ser oferecidos por qualquer médico
  {
    id: '1',
    nome: 'Consulta Médica',
    descricao: 'Consulta geral com avaliação médica',
    duracao: 60,
    preco: 200,
    medicoId: 'any',
  },
  {
    id: '2',
    nome: 'Consulta de Retorno',
    descricao: 'Consulta de acompanhamento',
    duracao: 30,
    preco: 100,
    medicoId: 'any',
  },
  {
    id: '3',
    nome: 'Avaliação Clínica',
    descricao: 'Avaliação médica detalhada',
    duracao: 45,
    preco: 180,
    medicoId: 'any',
  },
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

  const buscarMedicosPorEspecialidadeId = useCallback(
    (especialidadeId: string): Medico[] => {
      const users = MockDatabase.getUsers();
      const especialidade = especialidadesDisponiveis.find(
        (esp) => esp.id === especialidadeId
      );

      if (!especialidade) return [];

      const medicos = users
        .filter((user) => user.role === 'medico')
        .filter((user) => {
          // Verifica se o médico tem a especialidade definida no complementInfo
          const especialidadeMedico = user.complementInfo?.especialidade;
          return especialidadeMedico === especialidade.nome;
        })
        .map((user) => ({
          id: user.id,
          nome: user.name,
          especialidade: user.complementInfo?.especialidade || 'Não informado',
          especialidadeId: especialidadeId,
          crm: user.complementInfo?.crm || 'CRM não informado',
          avaliacoes: 4.5, // Valor padrão
          telefone: user.complementInfo?.telefone || 'Telefone não informado',
          email: user.email,
        }));

      return medicos;
    },
    []
  );

  const buscarMedicosPorNome = useCallback((nome: string): Medico[] => {
    const nomeNormalizado = nome.toLowerCase().trim();
    if (!nomeNormalizado) return [];

    const users = MockDatabase.getUsers();
    const medicos = users
      .filter((user) => user.role === 'medico')
      .filter((user) => user.name.toLowerCase().includes(nomeNormalizado))
      .map((user) => {
        // Encontrar a especialidade do médico
        const especialidadeMedico = user.complementInfo?.especialidade;
        const especialidade = especialidadesDisponiveis.find(
          (esp) => esp.nome === especialidadeMedico
        );

        return {
          id: user.id,
          nome: user.name,
          especialidade: especialidadeMedico || 'Não informado',
          especialidadeId: especialidade?.id || '0',
          crm: user.complementInfo?.crm || 'CRM não informado',
          avaliacoes: 4.5, // Valor padrão
          telefone: user.complementInfo?.telefone || 'Telefone não informado',
          email: user.email,
        };
      });

    return medicos;
  }, []);

  const buscarTratamentosPorMedico = useCallback(
    (medicoId: string): Tratamento[] => {
      // Retorna tratamentos genéricos para qualquer médico
      // Em um sistema real, isso poderia ser mais específico por especialidade
      return mockTratamentos.map((tratamento) => ({
        ...tratamento,
        medicoId: medicoId, // Associa o tratamento ao médico específico
      }));
    },
    []
  );

  const criarAgendamento = useCallback(
    async (request: AgendamentoRequest): Promise<Schedule> => {
      setLoading(true);

      try {
        // Simula uma chamada de API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Buscar informações necessárias
        const medico = MockDatabase.getUserByEmail('medico@test.com'); // Simplificado
        const tratamento = mockTratamentos.find(
          (t) => t.id === request.tratamentoId
        );
        const currentUser = MockDatabase.getCurrentUser();

        // Criar data/hora combinadas
        const startDateTime = new Date(
          `${request.data}T${request.horaInicio}:00`
        );
        const endDateTime = new Date(
          startDateTime.getTime() + (tratamento?.duracao || 60) * 60000
        );

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
        setAgendamentos((prev) => [...prev, novoAgendamento]);

        return novoAgendamento;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const cancelarAgendamento = useCallback(
    async (agendamentoId: string): Promise<void> => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const success = MockDatabase.updateScheduleStatus(
          agendamentoId,
          'cancelado'
        );

        if (success) {
          // Atualiza estado local
          setAgendamentos((prev) =>
            prev.map((agendamento) =>
              agendamento.id === agendamentoId
                ? {
                    ...agendamento,
                    status: 'cancelado',
                    updatedAt: new Date().toISOString(),
                  }
                : agendamento
            )
          );
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const obterAgendamentosPaciente = useCallback(
    (pacienteId: string): Schedule[] => {
      return MockDatabase.getSchedulesByPaciente(pacienteId);
    },
    []
  );

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
