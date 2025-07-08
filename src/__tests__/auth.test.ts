import {
    checkEmailExists,
    validateLogin,
    registerUser,
    getUserByEmail,
    initializeUsers
} from '@/lib/auth'
import { MockDatabase } from '@/mocks/database'
import { mockUsers } from '@/mocks/users'

// Mock MockDatabase
jest.mock('@/mocks/database', () => ({
    MockDatabase: {
        initialize: jest.fn(),
        getUserByEmail: jest.fn(),
        createUser: jest.fn(),
        getUsers: jest.fn(),
    },
}))

const mockDatabase = MockDatabase as jest.Mocked<typeof MockDatabase>

describe('Auth Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('checkEmailExists', () => {
        it('should return true if email exists', () => {
            const mockUser = mockUsers[0]
            mockDatabase.getUserByEmail.mockReturnValue(mockUser)

            const result = checkEmailExists('admin@example.com')

            expect(result).toBe(true)
            expect(mockDatabase.getUserByEmail).toHaveBeenCalledWith('admin@example.com')
        })

        it('should return false if email does not exist', () => {
            mockDatabase.getUserByEmail.mockReturnValue(null)

            const result = checkEmailExists('nonexistent@example.com')

            expect(result).toBe(false)
            expect(mockDatabase.getUserByEmail).toHaveBeenCalledWith('nonexistent@example.com')
        })
    })

    describe('validateLogin', () => {
        it('should return user if credentials are valid', () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: 'paciente' as const,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
            mockDatabase.getUserByEmail.mockReturnValue(mockUser)

            const result = validateLogin('test@example.com', 'password123')

            expect(result).toEqual(mockUser)
            expect(mockDatabase.getUserByEmail).toHaveBeenCalledWith('test@example.com')
        })

        it('should return null if user does not exist', () => {
            mockDatabase.getUserByEmail.mockReturnValue(null)

            const result = validateLogin('test@example.com', 'password123')

            expect(result).toBeNull()
        })

        it('should return null if password is incorrect', () => {
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                role: 'paciente' as const,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }
            mockDatabase.getUserByEmail.mockReturnValue(mockUser)

            const result = validateLogin('test@example.com', 'wrongpassword')

            expect(result).toBeNull()
        })
    })

    describe('registerUser', () => {
        it('should create new user if email does not exist', () => {
            const newUser = {
                id: '123',
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'paciente' as const,
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            }

            mockDatabase.getUserByEmail.mockReturnValue(null)
            mockDatabase.createUser.mockReturnValue(newUser)

            const result = registerUser('newuser@example.com', 'password123', 'New User')

            expect(result).toEqual(newUser)
            expect(mockDatabase.createUser).toHaveBeenCalledWith({
                email: 'newuser@example.com',
                password: 'password123',
                name: 'New User',
                role: 'paciente'
            })
        })

        it('should return null if email already exists', () => {
            const existingUser = mockUsers[0]
            mockDatabase.getUserByEmail.mockReturnValue(existingUser)

            const result = registerUser('admin@example.com', 'password123', 'Admin')

            expect(result).toBeNull()
            expect(mockDatabase.createUser).not.toHaveBeenCalled()
        })
    })

    describe('getUserByEmail', () => {
        it('should return user if email exists', () => {
            const mockUser = mockUsers[0]
            mockDatabase.getUserByEmail.mockReturnValue(mockUser)

            const result = getUserByEmail('admin@example.com')

            expect(result).toEqual(mockUser)
            expect(mockDatabase.getUserByEmail).toHaveBeenCalledWith('admin@example.com')
        })

        it('should return null if email does not exist', () => {
            mockDatabase.getUserByEmail.mockReturnValue(null)

            const result = getUserByEmail('nonexistent@example.com')

            expect(result).toBeNull()
        })
    })

    describe('initializeUsers', () => {
        it('should call MockDatabase.initialize', () => {
            initializeUsers()

            expect(mockDatabase.initialize).toHaveBeenCalled()
        })
    })
})
