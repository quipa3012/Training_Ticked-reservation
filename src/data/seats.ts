export interface Seat {
    code: string;               // A1, A2...
    type: 'NORMAL' | 'VIP';
    price: number;              // giá ghế
}

export const seats: Seat[] = [
    // Row A
    { code: 'A1', type: 'NORMAL', price: 70000 },
    { code: 'A2', type: 'NORMAL', price: 70000 },
    { code: 'A3', type: 'NORMAL', price: 70000 },
    { code: 'A4', type: 'NORMAL', price: 70000 },
    { code: 'A5', type: 'NORMAL', price: 70000 },
    { code: 'A6', type: 'NORMAL', price: 70000 },

    // Row B
    { code: 'B1', type: 'NORMAL', price: 70000 },
    { code: 'B2', type: 'NORMAL', price: 70000 },
    { code: 'B3', type: 'NORMAL', price: 70000 },
    { code: 'B4', type: 'NORMAL', price: 70000 },
    { code: 'B5', type: 'NORMAL', price: 70000 },
    { code: 'B6', type: 'NORMAL', price: 70000 },

    // Row C (sweet spot)
    { code: 'C1', type: 'VIP', price: 90000 },
    { code: 'C2', type: 'VIP', price: 90000 },
    { code: 'C3', type: 'VIP', price: 90000 },
    { code: 'C4', type: 'VIP', price: 90000 },
    { code: 'C5', type: 'VIP', price: 90000 },
    { code: 'C6', type: 'VIP', price: 90000 },

    // Row D
    { code: 'D1', type: 'VIP', price: 90000 },
    { code: 'D2', type: 'VIP', price: 90000 },
    { code: 'D3', type: 'VIP', price: 90000 },
    { code: 'D4', type: 'VIP', price: 90000 },
    { code: 'D5', type: 'VIP', price: 90000 },
    { code: 'D6', type: 'VIP', price: 90000 },

    // Row E (back row – cheap)
    { code: 'E1', type: 'NORMAL', price: 65000 },
    { code: 'E2', type: 'NORMAL', price: 65000 },
    { code: 'E3', type: 'NORMAL', price: 65000 },
    { code: 'E4', type: 'NORMAL', price: 65000 },
    { code: 'E5', type: 'NORMAL', price: 65000 },
    { code: 'E6', type: 'NORMAL', price: 65000 },
];
