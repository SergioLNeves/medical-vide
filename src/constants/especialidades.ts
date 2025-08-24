// Especialidades médicas disponíveis no sistema
// Esta lista deve ser consistente com o hook useAgendamento
export const especialidadesDisponiveis = [
    { id: '1', nome: 'Cardiologia' },
    { id: '2', nome: 'Dermatologia' },
    { id: '3', nome: 'Neurologia' },
    { id: '4', nome: 'Ortopedia' },
    { id: '5', nome: 'Pediatria' },
    { id: '6', nome: 'Psiquiatria' },
    { id: '7', nome: 'Ginecologia' },
    { id: '8', nome: 'Urologia' },
    { id: '9', nome: 'Oftalmologia' },
    { id: '10', nome: 'Otorrinolaringologia' },
    { id: '11', nome: 'Endocrinologia' },
    { id: '12', nome: 'Gastroenterologia' },
    { id: '13', nome: 'Pneumologia' },
    { id: '14', nome: 'Reumatologia' },
    { id: '15', nome: 'Clínico Geral' },
];

// Função utilitária para obter lista de nomes de especialidades
export const getEspecialidadeNomes = (): string[] => {
    return especialidadesDisponiveis.map(esp => esp.nome);
};

// Função utilitária para obter uma especialidade por nome
export const getEspecialidadeByNome = (nome: string) => {
    return especialidadesDisponiveis.find(esp => esp.nome === nome);
};

// Função utilitária para obter uma especialidade por ID
export const getEspecialidadeById = (id: string) => {
    return especialidadesDisponiveis.find(esp => esp.id === id);
};
