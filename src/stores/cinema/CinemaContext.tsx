'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Cinema } from '@/data/cinemas';

const CinemaContext = createContext<Cinema[] | null>(null);

export function CinemaProvider({ children }: { children: React.ReactNode }) {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);

    useEffect(() => {
        fetch('/api/cinemas')
            .then(res => res.json())
            .then(setCinemas);
    }, []);

    return (
        <CinemaContext.Provider value={cinemas}>
            {children}
        </CinemaContext.Provider>
    );
}

export const useCinemas = () => {
    const ctx = useContext(CinemaContext);
    if (!ctx) throw new Error('useCinemas phải nằm trong CinemaProvider');
    return ctx;
};
