'use client';

import { AuthProvider } from '@/stores/auth/AuthContext';
import { MovieProvider } from '@/stores/movie/MovieContext';
import { CinemaProvider } from '@/stores/cinema/CinemaContext';
import { BookingProvider } from '@/stores/booking/BookingContext';

export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <MovieProvider>
                <CinemaProvider>
                    <BookingProvider>
                        {children}
                    </BookingProvider>
                </CinemaProvider>
            </MovieProvider>
        </AuthProvider>
    );
}
