'use client';

import { useEffect, useState } from 'react';
import { Button, Form, Select, message } from 'antd';
import dayjs from 'dayjs';
import { useBooking } from '@/stores/booking/BookingContext';
import { useCinemas } from '@/stores/cinema/CinemaContext';
import { useMovies } from '@/stores/movie/MovieContext';
import styles from './bookingform.module.scss';

const { Option } = Select;

const popupContainer = (trigger: HTMLElement) => trigger.parentElement!;

interface BookingFormValues {
  movieId?: number;
  cinemaId?: number;
  showtimeId?: number;
  seatCodes?: string[];
}

interface Showtime {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  price: number;
}

interface Seat {
  code: string;
  type: 'NORMAL' | 'VIP';
  price: number;
  isBooked: boolean;
}

export default function BookingForm() {
  const [form] = Form.useForm<BookingFormValues>();

  const { movies } = useMovies();
  const cinemas = useCinemas();
  const { createBooking } = useBooking();

  const movieId = Form.useWatch('movieId', form);
  const cinemaId = Form.useWatch('cinemaId', form);

  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loadingShowtime, setLoadingShowtime] = useState(false);

  const showtimeId = Form.useWatch('showtimeId', form);

  const [seats, setSeats] = useState<Seat[]>([]);
  const [loadingSeats, setLoadingSeats] = useState(false);

  useEffect(() => {
    if (!showtimeId) {
      setSeats([]);
      form.setFieldValue('seatCodes', []);
      return;
    }

    const fetchSeats = async () => {
      try {
        setLoadingSeats(true);
        const res = await fetch(`/api/seats?showtimeId=${showtimeId}`);
        const data = await res.json();
        setSeats(data);
        form.setFieldValue('seatCodes', []);
      } catch {
        message.error('Không lấy được danh sách ghế');
        setSeats([]);
      } finally {
        setLoadingSeats(false);
      }
    };

    fetchSeats();
  }, [showtimeId, form]);

  const toggleSeat = (code: string) => {
    const current = form.getFieldValue('seatCodes') || [];
    form.setFieldValue(
      'seatCodes',
      current.includes(code) ? current.filter((c: string) => c !== code) : [...current, code]
    );
  };

  const values = Form.useWatch([], form);

  const selectedSeats = seats.filter((seat) => values?.seatCodes?.includes(seat.code));

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // fetch showtimes khi chọn phim + rạp
  useEffect(() => {
    if (!movieId || !cinemaId) {
      setShowtimes([]);
      form.setFieldValue('showtimeId', undefined);
      return;
    }

    const fetchShowtimes = async () => {
      try {
        setLoadingShowtime(true);
        const res = await fetch(`/api/showtimes?movieId=${movieId}&cinemaId=${cinemaId}`);

        if (!res.ok) {
          throw new Error('Không lấy được suất chiếu');
        }

        const data = await res.json();
        setShowtimes(data);
        form.setFieldValue('showtimeId', undefined);
      } catch (err: any) {
        message.error(err.message);
        setShowtimes([]);
      } finally {
        setLoadingShowtime(false);
      }
    };

    fetchShowtimes();
  }, [movieId, cinemaId, form]);

  const isFormComplete =
    !!values?.movieId &&
    !!values?.cinemaId &&
    !!values?.showtimeId &&
    Array.isArray(values?.seatCodes) &&
    values.seatCodes.length > 0 &&
    !form.getFieldsError().some((f) => f.errors.length);

  const handleSubmit = async (values: BookingFormValues) => {
    try {
      await createBooking({
        userId: 3, // mock
        showtimeId: values.showtimeId!,
        seatCodes: values.seatCodes!,
      });

      message.success('Đặt vé thành công');
      form.resetFields();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div className={styles.bookingFloat}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Phim" name="movieId" rules={[{ required: true }]}>
          <Select placeholder="Chọn phim" getPopupContainer={popupContainer}>
            {movies.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Rạp" name="cinemaId" rules={[{ required: true }]}>
          <Select placeholder="Chọn rạp" getPopupContainer={popupContainer}>
            {cinemas.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Suất chiếu" name="showtimeId" rules={[{ required: true }]}>
          <Select
            placeholder="Chọn suất chiếu"
            getPopupContainer={popupContainer}
            disabled={!movieId || !cinemaId}
            loading={loadingShowtime}
          >
            {showtimes.map((s) => (
              <Option key={s.id} value={s.id}>
                {dayjs(s.startTime).format('DD/MM HH:mm')} – {s.price.toLocaleString()}₫
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="seatCodes" rules={[{ required: true }]} hidden initialValue={[]}>
          <input type="hidden" />
        </Form.Item>

        <Form.Item label="Ghế" required shouldUpdate>
          <div className={styles.seatGrid}>
            {seats.map((seat) => {
              const selected = values?.seatCodes?.includes(seat.code);

              return (
                <Button
                  key={seat.code}
                  disabled={seat.isBooked}
                  type={selected ? 'primary' : 'default'}
                  className={`${styles.seat} ${seat.type === 'VIP' ? styles.vip : ''}`}
                  loading={loadingSeats}
                  onClick={() => toggleSeat(seat.code)}
                >
                  {seat.code}
                </Button>
              );
            })}
          </div>
        </Form.Item>

        <Form.Item label="Tổng tiền">
          <div className={styles.totalPrice}>{totalPrice.toLocaleString()}₫</div>
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={!isFormComplete} block>
          Đặt vé
        </Button>
      </Form>
    </div>
  );
}
