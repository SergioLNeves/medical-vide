// Exporta todos os tipos e utilitários dos mocks
export * from './types';
export * from './users';
export * from './agendas';
export * from './database';

// Re-export da classe principal para facilitar uso
export { MockDatabase as DB } from './database';
