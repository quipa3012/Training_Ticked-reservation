export interface Booking {
    id: number;
    userId: number;

    showtimeId: number;
    seats: string[];

    totalPrice: number;
}

export const bookings: Booking[] = [
    {
        id: 1,
        userId: 2,
        showtimeId: 1,
        seats: ['A1', 'A2'],
        totalPrice: 140000,
    },
];
