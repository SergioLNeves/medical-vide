import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Schedule from './page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock useAuth hook
jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}))

const mockPush = jest.fn()
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('Schedule Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseRouter.mockReturnValue({
            push: mockPush,
            replace: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
            prefetch: jest.fn(),
        })
    })

    it('should render loading state', () => {
        mockUseAuth.mockReturnValue({
            user: null,
            loading: true,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: false,
        })

        render(<Schedule />)

        expect(screen.getByText('Redirecionando...')).toBeTruthy()
        expect(screen.getByTestId('loading-spinner')).toBeTruthy()
    })

    it('should redirect to login when user is not authenticated', () => {
        mockUseAuth.mockReturnValue({
            user: null,
            loading: false,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: false,
        })

        render(<Schedule />)

        expect(mockPush).toHaveBeenCalledWith('/auth/login')
    })

    it('should redirect to schedule/paciente when user is paciente', () => {
        mockUseAuth.mockReturnValue({
            user: {
                id: '1',
                email: 'paciente@example.com',
                password: 'password123',
                name: 'Paciente Test',
                role: 'paciente',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            loading: false,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: true,
        })

        render(<Schedule />)

        expect(mockPush).toHaveBeenCalledWith('/schedule/paciente')
    })

    it('should redirect to schedule/medico when user is medico', () => {
        mockUseAuth.mockReturnValue({
            user: {
                id: '2',
                email: 'medico@example.com',
                password: 'password123',
                name: 'Medico Test',
                role: 'medico',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            loading: false,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: true,
        })

        render(<Schedule />)

        expect(mockPush).toHaveBeenCalledWith('/schedule/medico')
    })

    it('should redirect to schedule/admin when user is admin', () => {
        mockUseAuth.mockReturnValue({
            user: {
                id: '3',
                email: 'admin@example.com',
                password: 'password123',
                name: 'Admin Test',
                role: 'admin',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            loading: false,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: true,
        })

        render(<Schedule />)

        expect(mockPush).toHaveBeenCalledWith('/schedule/admin')
    })

    it('should not redirect when loading', () => {
        mockUseAuth.mockReturnValue({
            user: null,
            loading: true,
            login: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: false,
        })

        render(<Schedule />)

        expect(mockPush).not.toHaveBeenCalled()
    })
})
