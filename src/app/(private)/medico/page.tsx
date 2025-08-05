"use client";

import React from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useMemo, useState } from "react";
import Loading from "@/components/loading/loading";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from 'next/navigation';
import { mockSchedules } from '@/mocks/schedule';
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
    type Status
} from '@/components/ui/kibo-ui/calendar';

interface CalendarEvent {
    id: string;
    start: Date;
    end: Date;
    title: string;
    color?: 'blue' | 'green' | 'pink' | 'purple' | 'default';
}


export default function MedicoPage() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleLogout = () => {
        logout(); // Clear user session
        router.push('/'); // Refresh the page to reflect the logout state
    };

    useEffect(() => {
        if (user && user.role !== 'medico') {
            router.push(`/${user?.role}`);
        }
    }, [user, router]);

    // Color mapping for schedule status
    const colorMap: Record<string, string> = {
        'blue': '#3b82f6',
        'green': '#10b981',
        'pink': '#ec4899',
        'purple': '#8b5cf6',
        'default': '#6b7280'
    };

    // Convert schedules to calendar features for the current doctor
    const calendarFeatures: Feature[] = useMemo(() => {
        if (!user) return [];

        return mockSchedules
            .filter(schedule => schedule.medicoId === user.id)
            .map(schedule => ({
                id: schedule.id,
                name: schedule.title,
                startAt: schedule.start,
                endAt: schedule.end,
                status: {
                    id: schedule.status,
                    name: schedule.status,
                    color: colorMap[schedule.color || 'default']
                } as Status
            }));
    }, [user]);

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
                        <h1 className="text-3xl font-bold md:text-4xl">
                            Painel do Médico
                        </h1>
                        <p className="text-muted-foreground max-w-3xl text-lg md:text-xl">
                            Bem-vindo ao seu painel médico. Gerencie suas consultas,
                            visualize agendamentos e acompanhe seus pacientes de forma
                            eficiente e organizada.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Agenda de Consultas</h2>
                        <CalendarProvider locale="pt-BR" className="max-w-6xl">
                            <div className="border rounded-lg overflow-hidden">
                                <div className="bg-white p-4 border-b">
                                    <CalendarDate>
                                        <CalendarDatePicker>
                                            <CalendarMonthPicker className="mr-2" />
                                            <CalendarYearPicker start={2024} end={2030} />
                                        </CalendarDatePicker>
                                    </CalendarDate>
                                </div>
                                <CalendarHeader className="bg-gray-50 border-b" />
                                <CalendarBody features={calendarFeatures} onDateClick={handleDateClick}>
                                    {({ feature }) => (
                                        <CalendarItem
                                            feature={feature}
                                            className="text-xs mb-1 p-1 rounded"
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
    )
}