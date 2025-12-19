import { NextResponse } from 'next/server';
import { seats } from '@/data/seats';
import { bookings } from '@/data/bookings';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const showtimeId = Number(searchParams.get('showtimeId'));

    if (!showtimeId) {
        return NextResponse.json([], { status: 200 });
    }

    // mock: ghế đã đặt theo showtime
    const bookedSeats = bookings
        .filter(b => b.showtimeId === showtimeId)
        .flatMap(b => b.seats);

    const result = seats.map(seat => ({
        ...seat,
        isBooked: bookedSeats.includes(seat.code),
    }));

    return NextResponse.json(result);
}
