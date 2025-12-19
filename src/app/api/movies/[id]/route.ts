import { movies } from '@/data/movies';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
    _: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const movie = movies.find(m => m.id === Number(id));

    if (!movie) {
        return NextResponse.json(
            { message: 'Không tìm thấy phim' },
            { status: 404 }
        );
    }

    return NextResponse.json(movie);
}
