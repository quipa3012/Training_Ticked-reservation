import { NextResponse } from 'next/server';
import { bookings } from '@/data/bookings';
import { seats } from '@/data/seats';
import { showtimes } from '@/data/showtime';

export async function POST(req: Request) {
    const body = await req.json();

    const {
        userId,
        showtimeId,
        seatCodes,
    } = body;

    // 1. check showtime tồn tại
    const showtime = showtimes.find(
        s => s.id === showtimeId
    );

    if (!showtime) {
        return NextResponse.json(
            { message: 'Suất chiếu không tồn tại' },
            { status: 400 }
        );
    }

    // 2. check ghế trùng theo showtime
    const existed = bookings.some(
        b =>
            b.showtimeId === showtimeId &&
            b.seats.some(s =>
                seatCodes.includes(s)
            )
    );

    if (existed) {
        return NextResponse.json(
            { message: 'Ghế đã có người đặt' },
            { status: 400 }
        );
    }

    // 3. tính tiền ghế
    const selectedSeats = seats.filter(s =>
        seatCodes.includes(s.code)
    );

    const totalPrice = selectedSeats.reduce(
        (sum, s) => sum + s.price,
        0
    );

    // 4. tạo booking
    const newBooking = {
        id: bookings.length + 1,
        userId,
        showtimeId,
        seats: seatCodes,
        totalPrice,
    };

    bookings.push(newBooking);

    return NextResponse.json(newBooking, {
        status: 201,
    });
}
