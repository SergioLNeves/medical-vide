import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '@/app/dashboard/_components/navbar/navbar'
import { User } from '@/mocks/types'

describe('Navbar Component', () => {
    const mockUser: User = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'paciente',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    const mockOnLogout = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should render navbar with user information', () => {
        render(<Navbar user={mockUser} onLogout={mockOnLogout} />)

        expect(screen.getByText('Medical Vide')).toBeTruthy()
        expect(screen.getByText('Bem-vindo, Test User')).toBeTruthy()
        expect(screen.getByText('paciente')).toBeTruthy()
        expect(screen.getByText('Sair')).toBeTruthy()
    })

    it('should display different role badges', () => {
        const adminUser = { ...mockUser, role: 'admin' as const }
        const { rerender } = render(<Navbar user={adminUser} onLogout={mockOnLogout} />)

        expect(screen.getByText('admin')).toBeTruthy()

        const medicoUser = { ...mockUser, role: 'medico' as const }
        rerender(<Navbar user={medicoUser} onLogout={mockOnLogout} />)

        expect(screen.getByText('medico')).toBeTruthy()
    })

    it('should call onLogout when logout button is clicked', () => {
        render(<Navbar user={mockUser} onLogout={mockOnLogout} />)

        const logoutButton = screen.getByText('Sair')
        fireEvent.click(logoutButton)

        expect(mockOnLogout).toHaveBeenCalledTimes(1)
    })

    it('should display user name correctly', () => {
        const userWithLongName = {
            ...mockUser,
            name: 'Very Long Name That Should Be Displayed'
        }

        render(<Navbar user={userWithLongName} onLogout={mockOnLogout} />)

        expect(screen.getByText('Bem-vindo, Very Long Name That Should Be Displayed')).toBeTruthy()
    })

    it('should render logo text correctly', () => {
        render(<Navbar user={mockUser} onLogout={mockOnLogout} />)

        const logo = screen.getByText('Medical Vide')
        expect(logo).toBeTruthy()
    })
})
