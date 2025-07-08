import { MockDatabase } from '@/mocks/database'
import { User, Agenda } from '@/mocks/types'

// Mock localStorage
const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
})

describe('MockDatabase', () => {
    const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'paciente',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    const mockAgenda: Agenda = {
        id: '1',
        userEmail: 'test@example.com',
        title: 'Consulta Teste',
        description: 'Consulta de teste',
        date: '2024-12-01',
        time: '10:00',
        status: 'agendado',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockLocalStorage.getItem.mockReturnValue(null)
    })

    describe('User Operations', () => {
        it('should get users from localStorage', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.getUsers()

            expect(result).toEqual(users)
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('medical_users')
        })

        it('should return empty array if no users in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue(null)

            const result = MockDatabase.getUsers()

            expect(result).toEqual([])
        })

        it('should get user by email', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.getUserByEmail('test@example.com')

            expect(result).toEqual(mockUser)
        })

        it('should return null if user not found by email', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.getUserByEmail('notfound@example.com')

            expect(result).toBeNull()
        })

        it('should get user by id', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.getUserById('1')

            expect(result).toEqual(mockUser)
        })

        it('should return null if user not found by id', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.getUserById('999')

            expect(result).toBeNull()
        })

        it('should create new user', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const userData = {
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'paciente' as const
            }

            const result = MockDatabase.createUser(userData)

            expect(result).toEqual(expect.objectContaining({
                email: 'newuser@example.com',
                name: 'New User',
                role: 'paciente'
            }))
            expect(result.id).toBeDefined()
            expect(result.createdAt).toBeDefined()
            expect(result.updatedAt).toBeDefined()
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('medical_users', expect.any(String))
        })
    })

    describe('Agenda Operations', () => {
        it('should get agendas from localStorage', () => {
            const agendas = [mockAgenda]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const result = MockDatabase.getAgendas()

            expect(result).toEqual(agendas)
            expect(mockLocalStorage.getItem).toHaveBeenCalledWith('medical_agendas')
        })

        it('should return empty array if no agendas in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue(null)

            const result = MockDatabase.getAgendas()

            expect(result).toEqual([])
        })

        it('should get agenda by id', () => {
            const agendas = [mockAgenda]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const result = MockDatabase.getAgendaById('1')

            expect(result).toEqual(mockAgenda)
        })

        it('should return null if agenda not found by id', () => {
            const agendas = [mockAgenda]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const result = MockDatabase.getAgendaById('999')

            expect(result).toBeNull()
        })

        it('should get agendas by user email', () => {
            const agendas = [mockAgenda]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const result = MockDatabase.getAgendasByUserEmail('test@example.com')

            expect(result).toEqual([mockAgenda])
        })

        it('should get agendas by medico email', () => {
            const agendaWithMedico = {
                ...mockAgenda,
                medicoEmail: 'medico@example.com'
            }
            const agendas = [agendaWithMedico]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const result = MockDatabase.getAgendasByMedicoEmail('medico@example.com')

            expect(result).toEqual([agendaWithMedico])
        })

        it('should create new agenda', () => {
            const agendas = [mockAgenda]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(agendas))

            const agendaData = {
                userEmail: 'newuser@example.com',
                title: 'Nova Consulta',
                description: 'Descrição da nova consulta',
                date: '2024-12-02',
                time: '14:00',
                status: 'agendado' as const
            }

            const result = MockDatabase.createAgenda(agendaData)

            expect(result).toEqual(expect.objectContaining({
                userEmail: 'newuser@example.com',
                title: 'Nova Consulta',
                status: 'agendado'
            }))
            expect(result.id).toBeDefined()
            expect(result.createdAt).toBeDefined()
            expect(result.updatedAt).toBeDefined()
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('medical_agendas', expect.any(String))
        })
    })

    describe('Validation', () => {
        it('should validate existing user email', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.validateUserEmail('test@example.com')

            expect(result).toBe(true)
        })

        it('should return false for non-existing user email', () => {
            const users = [mockUser]
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(users))

            const result = MockDatabase.validateUserEmail('notfound@example.com')

            expect(result).toBe(false)
        })
    })
})
