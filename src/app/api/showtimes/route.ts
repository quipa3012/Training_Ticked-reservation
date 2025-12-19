import { NextResponse } from 'next/server';
import { showtimes } from '@/data/showtime';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const movieId = searchParams.get('movieId');
    const cinemaId = searchParams.get('cinemaId');

    let result = showtimes;

    if (movieId) {
        result = result.filter(
            s => s.movieId === Number(movieId)
        );
    }

    if (cinemaId) {
        result = result.filter(
            s => s.cinemaId === Number(cinemaId)
        );
    }

    return NextResponse.json(result);
}
