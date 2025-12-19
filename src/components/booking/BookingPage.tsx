'use client';

import { Card, Select, Button, Typography, message } from 'antd';
import { useState, useEffect } from 'react';
import { cinemas } from '@/data/cinemas';
import { seats } from '@/data/seats';
import { bookings } from '@/data/bookings';
import { showtimes } from '@/data/showtime';
import styles from './booking.module.scss';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/stores/auth/AuthContext';
import dayjs from 'dayjs';

const { Title } = Typography;

interface Props {
    movieId: number;
}

export default function BookingPage({ movieId }: Props) {
    const [cinemaId, setCinemaId] = useState<number>();
    const [showtimeId, setShowtimeId] = useState<number>();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            message.warning('Vui lòng đăng nhập để đặt vé');
            router.replace('/login');
        }
    }, [user, router]);

    if (!user) return null;

    // showtimes hợp lệ theo movie + cinema
    const availableShowtimes = showtimes.filter(
        s =>
            s.movieId === movieId &&
            (!cinemaId || s.cinemaId === cinemaId)
    );

    // ghế đã đặt theo showtime
    const bookedSeats = bookings
        .filter(b => b.showtimeId === showtimeId)
        .flatMap(b => b.seats);

    const toggleSeat = (code: string) => {
        setSelectedSeats(prev =>
            prev.includes(code)
                ? prev.filter(s => s !== code)
                : [...prev, code]
        );
    };

    const totalPrice = seats
        .filter(s => selectedSeats.includes(s.code))
        .reduce((sum, s) => sum + s.price, 0);

    const handleBooking = () => {
        if (!showtimeId || selectedSeats.length === 0) {
            message.error('Vui lòng chọn suất chiếu và ghế');
            return;
        }

        message.success('Đặt vé thành công (mock)');
        setSelectedSeats([]);
    };

    return (
        <div className={styles.container}>
            <Card>
                <Title level={2} style={{ textAlign: 'center' }}>
                    Đặt vé
                </Title>

                {/* Rạp */}
                <div className={styles.section}>
                    <Title level={5}>Chọn rạp:</Title>
                    <Select
                        placeholder="Chọn rạp"
                        className={styles.select}
                        value={cinemaId}
                        onChange={value => {
                            setCinemaId(value);
                            setShowtimeId(undefined);
                            setSelectedSeats([]);
                        }}
                        options={cinemas.map(c => ({
                            value: c.id,
                            label: c.name,
                        }))}
                    />
                </div>

                {/* Suất chiếu */}
                <div className={styles.section}>
                    <Title level={5}>Chọn suất chiếu:</Title>
                    <Select
                        placeholder="Chọn suất chiếu"
                        className={styles.select}
                        value={showtimeId}
                        disabled={!cinemaId}
                        onChange={value => {
                            setShowtimeId(value);
                            setSelectedSeats([]);
                        }}
                        options={availableShowtimes.map(s => ({
                            value: s.id,
                            label: `${dayjs(s.startTime).format(
                                'DD/MM HH:mm'
                            )} – ${s.price.toLocaleString()} đ`,
                        }))}
                    />
                </div>

                {/* Ghế */}
                <Title level={5}>Danh sách chỗ ngồi:</Title>
                <div className={styles.seatGrid}>
                    {seats.map(seat => {
                        const isBooked = bookedSeats.includes(seat.code);
                        const isSelected = selectedSeats.includes(seat.code);

                        return (
                            <Button
                                key={seat.code}
                                disabled={!showtimeId || isBooked}
                                type={isSelected ? 'primary' : 'default'}
                                onClick={() => toggleSeat(seat.code)}
                            >
                                {seat.code}
                            </Button>
                        );
                    })}
                </div>

                <div className={styles.footer}>
                    <div>
                        Ghế đã chọn:{' '}
                        {selectedSeats.join(', ') || '—'}
                    </div>
                    <div>
                        Tổng tiền:{' '}
                        <strong>
                            {totalPrice.toLocaleString()} đ
                        </strong>
                    </div>

                    <Button
                        type="primary"
                        onClick={handleBooking}
                        disabled={!showtimeId || selectedSeats.length === 0}
                    >
                        Xác nhận đặt vé
                    </Button>
                </div>
            </Card>
        </div>
    );
}
