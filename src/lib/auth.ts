import { User, MockDatabase } from '@/mocks';

// Utilitário para gerenciar cookies
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const removeCookie = (name: string) => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Inicializa o localStorage com os usuários mock se não existir
export const initializeUsers = (): void => {
  MockDatabase.initialize();
};

// Busca todos os usuários do localStorage
export const getUsers = (): User[] => {
  return MockDatabase.getUsers();
};

// Verifica se um email existe
export const checkEmailExists = (email: string): boolean => {
  return MockDatabase.getUserByEmail(email) !== null;
};

// Busca usuário por email
export const getUserByEmail = (email: string): User | null => {
  return MockDatabase.getUserByEmail(email);
};

// Valida login
export const validateLogin = (email: string, password: string): User | null => {
  const user = MockDatabase.getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Cadastra novo usuário (apenas pacientes)
export const registerUser = (
  email: string,
  password: string,
  name: string
): User | null => {
  // Verifica se email já existe
  if (checkEmailExists(email)) {
    return null;
  }

  const newUser = MockDatabase.createUser({
    email,
    password,
    name,
    role: 'paciente',
  });

  return newUser;
};

// Salva usuário atual (login) - usa cookie para integração com middleware
export const setCurrentUser = (user: User): void => {
  setCookie('current_user', JSON.stringify(user));
};

// Busca usuário atual - usa cookie para integração com middleware
export const getCurrentUser = (): User | null => {
  const userCookie = getCookie('current_user');

  if (!userCookie) return null;

  try {
    return JSON.parse(userCookie);
  } catch (error) {
    console.error('❌ Error parsing user cookie:', error);
    return null;
  }
};

// Remove usuário atual (logout) - remove cookie
export const removeCurrentUser = (): void => {
  removeCookie('current_user');
};
