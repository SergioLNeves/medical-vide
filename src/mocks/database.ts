import { User, Agenda } from './types';
import { mockUsers } from './users';
import { mockAgendas } from './agendas';

// Chaves do localStorage para cada tabela
const STORAGE_KEYS = {
    users: 'medical_users',
    agendas: 'medical_agendas',
    currentUser: 'current_user'
} as const;

// Classe para gerenciar o "banco de dados" no localStorage
export class MockDatabase {
    // Inicializa todas as tabelas com dados mock se não existirem
    static initialize(): void {
        if (typeof window === 'undefined') return;

        // Inicializa usuários
        const existingUsers = localStorage.getItem(STORAGE_KEYS.users);
        if (!existingUsers) {
            localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(mockUsers));
        }

        // Inicializa agendas
        const existingAgendas = localStorage.getItem(STORAGE_KEYS.agendas);
        if (!existingAgendas) {
            localStorage.setItem(STORAGE_KEYS.agendas, JSON.stringify(mockAgendas));
        }
    }

    // ============ OPERAÇÕES DE USUÁRIOS ============

    static getUsers(): User[] {
        if (typeof window === 'undefined') return [];
        const users = localStorage.getItem(STORAGE_KEYS.users);
        return users ? JSON.parse(users) : [];
    }

    static getUserById(id: string): User | null {
        const users = this.getUsers();
        return users.find(user => user.id === id) || null;
    }

    static getUserByEmail(email: string): User | null {
        const users = this.getUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
    }

    static createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
        const users = this.getUsers();
        const now = new Date().toISOString();

        const newUser: User = {
            ...userData,
            id: Date.now().toString(),
            email: userData.email.toLowerCase(),
            createdAt: now,
            updatedAt: now
        };

        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
        return newUser;
    }

    static updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): User | null {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) return null;

        const updatedUser = {
            ...users[userIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        users[userIndex] = updatedUser;
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
        return updatedUser;
    }

    static deleteUser(id: string): boolean {
        const users = this.getUsers();
        const filteredUsers = users.filter(user => user.id !== id);

        if (filteredUsers.length === users.length) return false;

        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(filteredUsers));
        return true;
    }

    // ============ OPERAÇÕES DE AGENDAS ============

    static getAgendas(): Agenda[] {
        if (typeof window === 'undefined') return [];
        const agendas = localStorage.getItem(STORAGE_KEYS.agendas);
        return agendas ? JSON.parse(agendas) : [];
    }

    static getAgendaById(id: string): Agenda | null {
        const agendas = this.getAgendas();
        return agendas.find(agenda => agenda.id === id) || null;
    }

    static getAgendasByUserEmail(userEmail: string): Agenda[] {
        const agendas = this.getAgendas();
        return agendas.filter(agenda => agenda.userEmail.toLowerCase() === userEmail.toLowerCase());
    }

    static getAgendasByMedicoEmail(medicoEmail: string): Agenda[] {
        const agendas = this.getAgendas();
        return agendas.filter(agenda => agenda.medicoEmail?.toLowerCase() === medicoEmail.toLowerCase());
    }

    static createAgenda(agendaData: Omit<Agenda, 'id' | 'createdAt' | 'updatedAt'>): Agenda {
        const agendas = this.getAgendas();
        const now = new Date().toISOString();

        const newAgenda: Agenda = {
            ...agendaData,
            id: Date.now().toString(),
            userEmail: agendaData.userEmail.toLowerCase(),
            medicoEmail: agendaData.medicoEmail?.toLowerCase(),
            createdAt: now,
            updatedAt: now
        };

        agendas.push(newAgenda);
        localStorage.setItem(STORAGE_KEYS.agendas, JSON.stringify(agendas));
        return newAgenda;
    }

    static updateAgenda(id: string, updates: Partial<Omit<Agenda, 'id' | 'createdAt'>>): Agenda | null {
        const agendas = this.getAgendas();
        const agendaIndex = agendas.findIndex(agenda => agenda.id === id);

        if (agendaIndex === -1) return null;

        const updatedAgenda = {
            ...agendas[agendaIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        agendas[agendaIndex] = updatedAgenda;
        localStorage.setItem(STORAGE_KEYS.agendas, JSON.stringify(agendas));
        return updatedAgenda;
    }

    static deleteAgenda(id: string): boolean {
        const agendas = this.getAgendas();
        const filteredAgendas = agendas.filter(agenda => agenda.id !== id);

        if (filteredAgendas.length === agendas.length) return false;

        localStorage.setItem(STORAGE_KEYS.agendas, JSON.stringify(filteredAgendas));
        return true;
    }

    // ============ OPERAÇÕES DE AUTENTICAÇÃO ============

    static getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem(STORAGE_KEYS.currentUser);
        return user ? JSON.parse(user) : null;
    }

    static setCurrentUser(user: User): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
    }

    static clearCurrentUser(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEYS.currentUser);
    }

    // ============ UTILITÁRIOS ============

    static clearAllData(): void {
        if (typeof window === 'undefined') return;
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }

    static resetToInitialData(): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(mockUsers));
        localStorage.setItem(STORAGE_KEYS.agendas, JSON.stringify(mockAgendas));
        this.clearCurrentUser();
    }

    // Valida se uma foreign key existe
    static validateUserEmail(email: string): boolean {
        return this.getUserByEmail(email) !== null;
    }
}
