'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMemo, useState, useEffect } from 'react';
import Loading from '@/components/loading/loading';
import Navbar from '@/components/navbar/navbar';
import { useRouter } from 'next/navigation';
import { MockDatabase } from '@/mocks/database';
import DayScheduleModal from './_components/day-schedule-modal';
import {
    CalendarProvider,
    CalendarHeader,
    CalendarBody,
    CalendarItem,
    CalendarDate,
    CalendarDatePicker,
    CalendarMonthPicker,
    CalendarYearPicker,
    type Feature,
    type Status,
} from '@/components/ui/kibo-ui/calendar';

export default function MedicoPage() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [schedules, setSchedules] = useState<any[]>([]);

    // Debug: Mostrar informações do usuário
    useEffect(() => {
        console.log('Current user in medico page:', user);
    }, [user]);

    // Carregar agendamentos do localStorage
    useEffect(() => {
        if (user) {
            // Garantir que o MockDatabase está inicializado
            MockDatabase.initialize();

            const loadSchedules = () => {
                console.log('Loading schedules for user:', user.id); // Debug log
                const userSchedules = MockDatabase.getSchedulesByMedico(user.id);
                console.log('Found schedules:', userSchedules); // Debug log
                setSchedules(userSchedules);
            };

            loadSchedules();

            // Escutar mudanças no localStorage
            const handleStorageChange = () => {
                loadSchedules();
            };

            // Escutar evento customizado de novo agendamento
            const handleNewSchedule = (event: CustomEvent) => {
                const newSchedule = event.detail;
                if (newSchedule.medicoId === user.id) {
                    loadSchedules();
                }
            };

            window.addEventListener('storage', handleStorageChange);
            window.addEventListener('scheduleCreated', handleNewSchedule as EventListener);

            // Atualizar a cada 5 segundos para sincronizar (reduzido para menos polling)
            const interval = setInterval(loadSchedules, 5000);

            return () => {
                window.removeEventListener('storage', handleStorageChange);
                window.removeEventListener('scheduleCreated', handleNewSchedule as EventListener);
                clearInterval(interval);
            };
        }
    }, [user]);

    const handleLogout = () => {
        logout(); // Clear user session
        router.push('/'); // Refresh the page to reflect the logout state
    };

    // Convert schedules to calendar features for the current doctor
    const calendarFeatures: Feature[] = useMemo(() => {
        const colorMap: Record<string, string> = {
            blue: '#3b82f6',
            green: '#10b981',
            pink: '#ec4899',
            purple: '#8b5cf6',
            default: '#6b7280',
        };

        if (!user || !schedules.length) return [];

        console.log('Schedules for calendar:', schedules); // Debug log

        return schedules
            .map((schedule) => ({
                id: schedule.id,
                name: schedule.title,
                startAt: new Date(schedule.start), // Converter para Date se for string
                endAt: new Date(schedule.end),     // Converter para Date se for string
                status: {
                    id: schedule.status,
                    name: schedule.status,
                    color: colorMap[schedule.color || 'default'],
                } as Status,
            }));
    }, [user, schedules]);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    if (!user) {
        return <Loading />;
    }
    return (
        <main className="bg-background min-h-screen">
            <Navbar onLogout={handleLogout} />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-12 px-4 py-6 sm:px-0">
                    <section className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold md:text-4xl">Painel do Médico</h1>
                                <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
                                    Bem-vindo ao seu painel médico. Gerencie suas consultas, visualize
                                    agendamentos e acompanhe seus pacientes de forma eficiente e
                                    organizada.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push('/medico/complement-info')}
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Editar Perfil
                            </button>
                        </div>
                    </section>
                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">Agenda de Consultas</h2>
                        <CalendarProvider locale="pt-BR" className="max-w-6xl">
                            <div className="overflow-hidden rounded-lg border">
                                <div className="border-b bg-white p-4">
                                    <CalendarDate>
                                        <CalendarDatePicker>
                                            <CalendarMonthPicker className="mr-2" />
                                            <CalendarYearPicker start={2024} end={2030} />
                                        </CalendarDatePicker>
                                    </CalendarDate>
                                </div>
                                <CalendarHeader className="border-b bg-gray-50" />
                                <CalendarBody
                                    features={calendarFeatures}
                                    onDateClick={handleDateClick}
                                >
                                    {({ feature }) => (
                                        <CalendarItem
                                            feature={feature}
                                            className="mb-1 rounded p-1 text-xs"
                                        />
                                    )}
                                </CalendarBody>
                            </div>
                        </CalendarProvider>
                    </section>
                </div>
            </div>

            {/* Modal para consultas do dia */}
            <DayScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                medicoId={user?.id || ''}
            />
        </main>
    );
}
