import { movies } from '@/data/movies';
import { NextResponse } from 'next/server';

export async function GET(
    _: Request,
    { params }: { params: { id: string } }
) {
    const movie = movies.find(m => m.id === Number(params.id));

    if (!movie) {
        return NextResponse.json(
            { message: 'Không tìm thấy phim' },
            { status: 404 }
        );
    }

    return NextResponse.json(movie);
}
