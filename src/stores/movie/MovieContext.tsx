'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '@/data/movies';

interface MovieContextValue {
    movies: Movie[];
    loading: boolean;
    fetchMovies: () => Promise<void>;
}

const MovieContext = createContext<MovieContextValue | null>(null);

export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/movies');
            const data = await res.json();
            setMovies(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <MovieContext.Provider
            value={{ movies, loading, fetchMovies }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovies() {
    const ctx = useContext(MovieContext);
    if (!ctx) {
        throw new Error('useMovies phải nằm trong MovieProvider');
    }
    return ctx;
}
