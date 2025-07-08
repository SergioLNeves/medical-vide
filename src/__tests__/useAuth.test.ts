import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { getCurrentUser, setCurrentUser, removeCurrentUser } from '@/lib/auth'
import { User } from '@/mocks/types'

// Mock the auth functions
jest.mock('@/lib/auth', () => ({
    getCurrentUser: jest.fn(),
    setCurrentUser: jest.fn(),
    removeCurrentUser: jest.fn(),
}))

const mockGetCurrentUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>
const mockSetCurrentUser = setCurrentUser as jest.MockedFunction<typeof setCurrentUser>
const mockRemoveCurrentUser = removeCurrentUser as jest.MockedFunction<typeof removeCurrentUser>

describe('useAuth Hook', () => {
    const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'paciente',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should initialize with loading state', () => {
        mockGetCurrentUser.mockReturnValue(null)

        const { result } = renderHook(() => useAuth())

        expect(result.current.loading).toBe(false) // After effect runs
        expect(result.current.user).toBeNull()
        expect(result.current.isAuthenticated).toBe(false)
    })

    it('should load user from getCurrentUser', () => {
        mockGetCurrentUser.mockReturnValue(mockUser)

        const { result } = renderHook(() => useAuth())

        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isAuthenticated).toBe(true)
        expect(result.current.loading).toBe(false)
    })

    it('should login user', () => {
        mockGetCurrentUser.mockReturnValue(null)

        const { result } = renderHook(() => useAuth())

        act(() => {
            result.current.login(mockUser)
        })

        expect(mockSetCurrentUser).toHaveBeenCalledWith(mockUser)
        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isAuthenticated).toBe(true)
    })

    it('should logout user', () => {
        mockGetCurrentUser.mockReturnValue(mockUser)

        const { result } = renderHook(() => useAuth())

        act(() => {
            result.current.logout()
        })

        expect(mockRemoveCurrentUser).toHaveBeenCalled()
        expect(result.current.user).toBeNull()
        expect(result.current.isAuthenticated).toBe(false)
    })

    it('should handle user state changes', () => {
        mockGetCurrentUser.mockReturnValue(null)

        const { result } = renderHook(() => useAuth())

        // Initial state
        expect(result.current.user).toBeNull()
        expect(result.current.isAuthenticated).toBe(false)

        // Login
        act(() => {
            result.current.login(mockUser)
        })

        expect(result.current.user).toEqual(mockUser)
        expect(result.current.isAuthenticated).toBe(true)

        // Logout
        act(() => {
            result.current.logout()
        })

        expect(result.current.user).toBeNull()
        expect(result.current.isAuthenticated).toBe(false)
    })
})
