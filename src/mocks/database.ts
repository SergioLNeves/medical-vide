import { User, UserRole, Schedule, ComplementInfo } from './types';
import { mockUsers } from './users';
import { mockSchedules } from './schedule';

// Chaves do localStorage para cada tabela
const STORAGE_KEYS = {
  users: 'medical_users',
  schedules: 'medical_schedules',
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

    // Inicializa agendamentos
    const existingSchedules = localStorage.getItem(STORAGE_KEYS.schedules);
    if (!existingSchedules) {
      localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(mockSchedules));
    }
  }

  // ============ OPERAÇÕES DE USUÁRIOS ============

  static getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem(STORAGE_KEYS.users);
    return users ? JSON.parse(users) : [];
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return (
      users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ||
      null
    );
  }

  static getUserByName(name: string): User | null {
    const users = this.getUsers();
    return users.find((user) => user.name.trim() === name.trim()) || null;
  }

  static createUser(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): User {
    const users = this.getUsers();
    const now = new Date().toISOString();

    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      name: userData.name.trim(),
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    return newUser;
  }

  static deleteUser(id: string): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false; // Usuário não encontrado
    }

    users.splice(userIndex, 1);
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    return true; // Usuário deletado com sucesso
  }

  static updateUser(
    id: string,
    name: string,
    email: string,
    role: string
  ): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false; // Usuário não encontrado
    }

    // Atualiza os dados do usuário
    users[userIndex] = {
      ...users[userIndex],
      name: name.trim(),
      email: email.toLowerCase(),
      role: role as UserRole,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    return true;
  }

  // Atualiza apenas a senha do usuário (para reset de senha)
  static updateUserPassword(email: string, newPassword: string): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return false; // Usuário não encontrado
    }

    // Atualiza apenas a senha
    users[userIndex] = {
      ...users[userIndex],
      password: newPassword,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
    return true;
  }

  // Atualiza as informações complementares do usuário
  static updateUserComplementInfo(id: string, complementInfo: Partial<ComplementInfo>): boolean {
    const users = this.getUsers();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false; // Usuário não encontrado
    }

    // Atualiza as informações complementares
    users[userIndex] = {
      ...users[userIndex],
      complementInfo: {
        ...users[userIndex].complementInfo,
        ...complementInfo,
      },
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));

    // Atualizar também o currentUser se for o mesmo usuário
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === id) {
      this.setCurrentUser(users[userIndex]);

      // Disparar evento customizado para notificar mudanças no usuário
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('userUpdated', {
          detail: users[userIndex]
        }));
      }
    }

    return true;
  }

  // ============ OPERAÇÕES DE AUTENTICAÇÃO ============

  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;

    // Usar cookie em vez de localStorage para consistência
    const getCookie = (name: string): string | null => {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    const userCookie = getCookie('current_user');
    if (!userCookie) return null;

    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('❌ Error parsing user cookie:', error);
      return null;
    }
  }

  static setCurrentUser(user: User): void {
    if (typeof window === 'undefined') return;

    // Usar cookie em vez de localStorage para consistência
    const setCookie = (name: string, value: string, days: number = 7) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    setCookie('current_user', JSON.stringify(user));
  }

  static clearCurrentUser(): void {
    if (typeof window === 'undefined') return;

    // Usar cookie em vez de localStorage
    const removeCookie = (name: string) => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    };

    removeCookie('current_user');
  }

  // ============ OPERAÇÕES DE AGENDAMENTOS ============

  static getSchedules(): Schedule[] {
    if (typeof window === 'undefined') return [];
    const schedules = localStorage.getItem(STORAGE_KEYS.schedules);
    return schedules ? JSON.parse(schedules) : [];
  }

  static createSchedule(
    scheduleData: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt'>
  ): Schedule {
    const schedules = this.getSchedules();
    const now = new Date().toISOString();

    const newSchedule: Schedule = {
      ...scheduleData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    schedules.push(newSchedule);
    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));

    // Disparar evento customizado para notificar outras páginas
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scheduleCreated', {
        detail: newSchedule
      }));
    }

    return newSchedule;
  }

  static updateScheduleStatus(id: string, status: Schedule['status']): boolean {
    const schedules = this.getSchedules();
    const scheduleIndex = schedules.findIndex((schedule) => schedule.id === id);

    if (scheduleIndex === -1) {
      return false; // Agendamento não encontrado
    }

    const updatedSchedule = {
      ...schedules[scheduleIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    schedules[scheduleIndex] = updatedSchedule;

    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));

    // Disparar evento customizado para notificar outras páginas
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('scheduleUpdated', {
        detail: updatedSchedule
      }));
    }

    return true;
  }

  static deleteSchedule(id: string): boolean {
    const schedules = this.getSchedules();
    const scheduleIndex = schedules.findIndex((schedule) => schedule.id === id);

    if (scheduleIndex === -1) {
      return false; // Agendamento não encontrado
    }

    schedules.splice(scheduleIndex, 1);
    localStorage.setItem(STORAGE_KEYS.schedules, JSON.stringify(schedules));
    return true;
  }

  static getSchedulesByMedico(medicoId: string): Schedule[] {
    const schedules = this.getSchedules();
    return schedules.filter(schedule => schedule.medicoId === medicoId);
  }

  static getSchedulesByPaciente(pacienteId: string): Schedule[] {
    const schedules = this.getSchedules();
    return schedules.filter(schedule => schedule.pacienteId === pacienteId);
  }
}
