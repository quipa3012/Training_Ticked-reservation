'use client';

import { createContext, useContext, ReactNode } from 'react';

export interface CreateBookingPayload {
  userId: number;
  showtimeId: number;
  seatCodes: string[];
}

export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  seats: string[];
  totalPrice: number;
}

interface BookingContextValue {
  createBooking: (payload: CreateBookingPayload) => Promise<Booking>;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const createBooking = async (
    payload: CreateBookingPayload
  ): Promise<Booking> => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err: { message?: string } = await res.json();
      throw new Error(err.message ?? 'Create booking failed');
    }

    return res.json();
  };

  return (
    <BookingContext.Provider value={{ createBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking phải nằm trong BookingProvider');
  }
  return ctx;
}
