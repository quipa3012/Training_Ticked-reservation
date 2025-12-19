'use client';

import { AuthProvider } from '@/stores/auth/AuthContext';
import { BookingProvider } from '@/stores/booking/BookingContext';
import { CinemaProvider } from '@/stores/cinema/CinemaContext';
import { MovieProvider } from '@/stores/movie/MovieContext';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MovieProvider>
        <CinemaProvider>
          <BookingProvider>{children}</BookingProvider>
        </CinemaProvider>
      </MovieProvider>
    </AuthProvider>
  );
}
