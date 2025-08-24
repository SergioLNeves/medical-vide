'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabledDates?: (date: Date) => boolean;
    className?: string;
}

export function DatePicker({
    value,
    onChange,
    placeholder = "Selecione uma data",
    disabledDates,
    className,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);

    React.useEffect(() => {
        setSelectedDate(value);
    }, [value]);

    const handleDateSelect = (date: Date | undefined) => {
        if (date && disabledDates && disabledDates(date)) {
            return;
        }
        setSelectedDate(date);
        onChange(date);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="p-4">
                    <input
                        type="date"
                        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value + "T00:00:00") : undefined;
                            handleDateSelect(newDate);
                        }}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}
