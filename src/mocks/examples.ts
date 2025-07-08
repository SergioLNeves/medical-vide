// Exemplo de como usar a estrutura de mocks para agendas

import { MockDatabase, Agenda } from '@/mocks';

// Exemplos de uso da nova estrutura

export class AgendaService {
    // Buscar todas as agendas de um paciente
    static getPatientAgendas(userEmail: string): Agenda[] {
        return MockDatabase.getAgendasByUserEmail(userEmail);
    }

    // Buscar todas as agendas de um médico
    static getMedicoAgendas(medicoEmail: string): Agenda[] {
        return MockDatabase.getAgendasByMedicoEmail(medicoEmail);
    }

    // Criar uma nova agenda para um paciente
    static createAgenda(
        userEmail: string,
        title: string,
        date: string,
        time: string,
        description?: string,
        medicoEmail?: string
    ): Agenda | null {
        // Verifica se o usuário existe
        if (!MockDatabase.validateUserEmail(userEmail)) {
            console.error('Usuário não encontrado:', userEmail);
            return null;
        }

        // Verifica se o médico existe (se informado)
        if (medicoEmail && !MockDatabase.validateUserEmail(medicoEmail)) {
            console.error('Médico não encontrado:', medicoEmail);
            return null;
        }

        return MockDatabase.createAgenda({
            userEmail,
            title,
            description,
            date,
            time,
            status: 'agendado',
            medicoEmail
        });
    }

    // Atualizar status de uma agenda
    static updateAgendaStatus(agendaId: string, status: Agenda['status']): Agenda | null {
        return MockDatabase.updateAgenda(agendaId, { status });
    }

    // Buscar agendas por data
    static getAgendasByDate(date: string): Agenda[] {
        const allAgendas = MockDatabase.getAgendas();
        return allAgendas.filter(agenda => agenda.date === date);
    }

    // Buscar próximas agendas de um usuário
    static getUpcomingAgendas(userEmail: string): Agenda[] {
        const userAgendas = this.getPatientAgendas(userEmail);
        const today = new Date().toISOString().split('T')[0];

        return userAgendas
            .filter(agenda => agenda.date >= today)
            .sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date);
                if (dateCompare === 0) {
                    return a.time.localeCompare(b.time);
                }
                return dateCompare;
            });
    }

    // Cancelar uma agenda
    static cancelAgenda(agendaId: string, userEmail: string): boolean {
        const agenda = MockDatabase.getAgendaById(agendaId);

        // Verifica se a agenda existe e pertence ao usuário
        if (!agenda || agenda.userEmail !== userEmail) {
            return false;
        }

        // Apenas agendas não concluídas podem ser canceladas
        if (agenda.status === 'concluido') {
            return false;
        }

        const updated = MockDatabase.updateAgenda(agendaId, { status: 'cancelado' });
        return updated !== null;
    }
}