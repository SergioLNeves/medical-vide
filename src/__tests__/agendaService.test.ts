import { AgendaService } from '@/mocks/examples'
import { MockDatabase } from '@/mocks/database'
import { Agenda } from '@/mocks/types'

// Mock MockDatabase
jest.mock('@/mocks/database', () => ({
    MockDatabase: {
        getAgendasByUserEmail: jest.fn(),
        getAgendasByMedicoEmail: jest.fn(),
        createAgenda: jest.fn(),
        updateAgenda: jest.fn(),
        getAgendas: jest.fn(),
        validateUserEmail: jest.fn(),
    },
}))

const mockDatabase = MockDatabase as jest.Mocked<typeof MockDatabase>

describe('AgendaService', () => {
    const mockAgenda: Agenda = {
        id: '1',
        userEmail: 'paciente@example.com',
        title: 'Consulta Cardiologia',
        description: 'Consulta preventiva',
        date: '2024-12-01',
        time: '10:00',
        status: 'agendado',
        medicoEmail: 'medico@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getPatientAgendas', () => {
        it('should return patient agendas', () => {
            const userEmail = 'paciente@example.com'
            mockDatabase.getAgendasByUserEmail.mockReturnValue([mockAgenda])

            const result = AgendaService.getPatientAgendas(userEmail)

            expect(result).toEqual([mockAgenda])
            expect(mockDatabase.getAgendasByUserEmail).toHaveBeenCalledWith(userEmail)
        })
    })

    describe('getMedicoAgendas', () => {
        it('should return medico agendas', () => {
            const medicoEmail = 'medico@example.com'
            mockDatabase.getAgendasByMedicoEmail.mockReturnValue([mockAgenda])

            const result = AgendaService.getMedicoAgendas(medicoEmail)

            expect(result).toEqual([mockAgenda])
            expect(mockDatabase.getAgendasByMedicoEmail).toHaveBeenCalledWith(medicoEmail)
        })
    })

    describe('createAgenda', () => {
        it('should create agenda successfully', () => {
            const userEmail = 'paciente@example.com'
            const title = 'Nova Consulta'
            const date = '2024-12-02'
            const time = '14:00'
            const description = 'Consulta de rotina'
            const medicoEmail = 'medico@example.com'

            mockDatabase.validateUserEmail.mockReturnValue(true)
            mockDatabase.createAgenda.mockReturnValue(mockAgenda)

            const result = AgendaService.createAgenda(
                userEmail,
                title,
                date,
                time,
                description,
                medicoEmail
            )

            expect(result).toEqual(mockAgenda)
            expect(mockDatabase.validateUserEmail).toHaveBeenCalledWith(userEmail)
            expect(mockDatabase.validateUserEmail).toHaveBeenCalledWith(medicoEmail)
            expect(mockDatabase.createAgenda).toHaveBeenCalledWith({
                userEmail,
                title,
                description,
                date,
                time,
                status: 'agendado',
                medicoEmail
            })
        })

        it('should return null if user does not exist', () => {
            const userEmail = 'invalid@example.com'
            mockDatabase.validateUserEmail.mockReturnValue(false)

            const result = AgendaService.createAgenda(
                userEmail,
                'Consulta',
                '2024-12-02',
                '14:00'
            )

            expect(result).toBeNull()
            expect(mockDatabase.validateUserEmail).toHaveBeenCalledWith(userEmail)
            expect(mockDatabase.createAgenda).not.toHaveBeenCalled()
        })

        it('should return null if medico does not exist', () => {
            const userEmail = 'paciente@example.com'
            const medicoEmail = 'invalid@example.com'

            mockDatabase.validateUserEmail
                .mockReturnValueOnce(true)  // user exists
                .mockReturnValueOnce(false) // medico doesn't exist

            const result = AgendaService.createAgenda(
                userEmail,
                'Consulta',
                '2024-12-02',
                '14:00',
                'Descrição',
                medicoEmail
            )

            expect(result).toBeNull()
            expect(mockDatabase.validateUserEmail).toHaveBeenCalledWith(userEmail)
            expect(mockDatabase.validateUserEmail).toHaveBeenCalledWith(medicoEmail)
            expect(mockDatabase.createAgenda).not.toHaveBeenCalled()
        })
    })

    describe('updateAgendaStatus', () => {
        it('should update agenda status', () => {
            const agendaId = '1'
            const newStatus = 'confirmado' as const
            const updatedAgenda = { ...mockAgenda, status: newStatus }

            mockDatabase.updateAgenda.mockReturnValue(updatedAgenda)

            const result = AgendaService.updateAgendaStatus(agendaId, newStatus)

            expect(result).toEqual(updatedAgenda)
            expect(mockDatabase.updateAgenda).toHaveBeenCalledWith(agendaId, { status: newStatus })
        })
    })

    describe('getAgendasByDate', () => {
        it('should return agendas by date', () => {
            const targetDate = '2024-12-01'
            const agendas = [mockAgenda]
            mockDatabase.getAgendas.mockReturnValue(agendas)

            const result = AgendaService.getAgendasByDate(targetDate)

            expect(result).toEqual([mockAgenda])
            expect(mockDatabase.getAgendas).toHaveBeenCalled()
        })

        it('should return empty array if no agendas for date', () => {
            const targetDate = '2024-12-31'
            mockDatabase.getAgendas.mockReturnValue([mockAgenda])

            const result = AgendaService.getAgendasByDate(targetDate)

            expect(result).toEqual([])
        })
    })

    describe('getUpcomingAgendas', () => {
        it('should return upcoming agendas', () => {
            const userEmail = 'paciente@example.com'
            const futureAgenda = {
                ...mockAgenda,
                date: '2025-12-01' // future date
            }
            mockDatabase.getAgendasByUserEmail.mockReturnValue([futureAgenda])

            const result = AgendaService.getUpcomingAgendas(userEmail)

            expect(result).toEqual([futureAgenda])
            expect(mockDatabase.getAgendasByUserEmail).toHaveBeenCalledWith(userEmail)
        })

        it('should not return past agendas', () => {
            const userEmail = 'paciente@example.com'
            const pastAgenda = {
                ...mockAgenda,
                date: '2020-01-01' // past date
            }
            mockDatabase.getAgendasByUserEmail.mockReturnValue([pastAgenda])

            const result = AgendaService.getUpcomingAgendas(userEmail)

            expect(result).toEqual([])
        })
    })
})
