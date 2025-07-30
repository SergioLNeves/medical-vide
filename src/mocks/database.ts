import { User, UserRole } from './types';
import { mockUsers } from './users';

// Chaves do localStorage para cada tabela
const STORAGE_KEYS = {
  users: 'medical_users',
  currentUser: 'current_user',
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
}
