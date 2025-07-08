import { render, screen } from '@testing-library/react'
import InfoPaciente from './info-paciente'
import { User } from '@/mocks/types'

describe('InfoPaciente Component', () => {
    const mockPacienteCompleto: User = {
        id: '1',
        email: 'paciente@example.com',
        password: 'password123',
        name: 'Ana Paula Costa',
        role: 'paciente',
        complementInfo: {
            cpf: '123.456.789-00',
            rg: '12.345.678-9',
            convenio: 'Unimed Premium',
            telefone: '(11) 98888-7777',
            endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo, SP',
            dataNascimento: '1985-03-15',
            contatoEmergencia: 'João Costa (marido) - (11) 97777-6666'
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    const mockPacienteBasico: User = {
        id: '2',
        email: 'paciente.basico@example.com',
        password: 'password123',
        name: 'Pedro Santos',
        role: 'paciente',
        complementInfo: {
            cpf: '987.654.321-00',
            telefone: '(11) 96666-5555'
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    it('should render patient information with complete data', () => {
        render(<InfoPaciente user={mockPacienteCompleto} />)

        expect(screen.getByText('Suas Informações')).toBeTruthy()
        expect(screen.getByText('Ana Paula Costa')).toBeTruthy()
        expect(screen.getByText('paciente@example.com')).toBeTruthy()
        expect(screen.getByText('123.456.789-00')).toBeTruthy()
        expect(screen.getByText('Unimed Premium')).toBeTruthy()
        expect(screen.getByText('(11) 98888-7777')).toBeTruthy()
    })

    it('should render patient information with basic data only', () => {
        render(<InfoPaciente user={mockPacienteBasico} />)

        expect(screen.getByText('Suas Informações')).toBeTruthy()
        expect(screen.getByText('Pedro Santos')).toBeTruthy()
        expect(screen.getByText('paciente.basico@example.com')).toBeTruthy()
        expect(screen.getByText('987.654.321-00')).toBeTruthy()
        expect(screen.getByText('(11) 96666-5555')).toBeTruthy()
    })

    it('should display ID do Paciente', () => {
        render(<InfoPaciente user={mockPacienteCompleto} />)

        expect(screen.getByText('ID do Paciente')).toBeTruthy()
        expect(screen.getByText('1')).toBeTruthy()
    })

    it('should not display empty fields', () => {
        const userWithoutComplementInfo: User = {
            ...mockPacienteBasico,
            complementInfo: undefined
        }

        render(<InfoPaciente user={userWithoutComplementInfo} />)

        expect(screen.getByText('Pedro Santos')).toBeTruthy()
        expect(screen.getByText('paciente.basico@example.com')).toBeTruthy()
        // Should not display CPF or other fields
        expect(screen.queryByText('CPF')).toBeFalsy()
    })

    it('should display emergency contact when available', () => {
        render(<InfoPaciente user={mockPacienteCompleto} />)

        expect(screen.getByText('Contato de Emergência')).toBeTruthy()
        expect(screen.getByText('João Costa (marido) - (11) 97777-6666')).toBeTruthy()
    })

    it('should display birth date when available', () => {
        render(<InfoPaciente user={mockPacienteCompleto} />)

        expect(screen.getByText('Data de Nascimento')).toBeTruthy()
        expect(screen.getByText('1985-03-15')).toBeTruthy()
    })
})
