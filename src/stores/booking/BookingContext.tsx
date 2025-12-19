'use client';

import { createContext, useContext } from 'react';

export interface CreateBookingPayload {
    userId: number;
    showtimeId: number;
    seatCodes: string[];
}


interface BookingContextValue {
    createBooking: (payload: CreateBookingPayload) => Promise<any>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const createBooking = async (payload: CreateBookingPayload) => {
        const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        return res.json();
    };

    return (
        <BookingContext.Provider value={{ createBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => {
    const ctx = useContext(BookingContext);
    if (!ctx) throw new Error('useBooking phải nằm trong BookingProvider');
    return ctx;
};
