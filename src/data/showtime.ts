export interface Showtime {
  id: number;
  movieId: number;
  cinemaId: number;

  startTime: string; // ISO datetime: 2025-12-20T19:00:00
  price: number; // giá cơ bản / ghế thường
}

export const showtimes: Showtime[] = [
  // ===== Iron Man (2008) =====
  { id: 1, movieId: 1, cinemaId: 1, startTime: '2025-12-20T18:30:00', price: 70000 },
  { id: 2, movieId: 1, cinemaId: 1, startTime: '2025-12-20T21:00:00', price: 70000 },
  { id: 3, movieId: 1, cinemaId: 2, startTime: '2025-12-21T17:45:00', price: 75000 },

  // ===== The Incredible Hulk =====
  { id: 4, movieId: 2, cinemaId: 2, startTime: '2025-12-20T19:00:00', price: 75000 },
  { id: 5, movieId: 2, cinemaId: 3, startTime: '2025-12-21T20:15:00', price: 75000 },

  // ===== Thor =====
  { id: 6, movieId: 3, cinemaId: 1, startTime: '2025-12-21T18:00:00', price: 80000 },
  { id: 7, movieId: 3, cinemaId: 4, startTime: '2025-12-21T20:45:00', price: 80000 },

  // ===== Captain America: The First Avenger =====
  { id: 8, movieId: 4, cinemaId: 1, startTime: '2025-12-22T17:30:00', price: 75000 },
  { id: 9, movieId: 4, cinemaId: 5, startTime: '2025-12-22T20:00:00', price: 75000 },

  // ===== The Avengers (2012) =====
  { id: 10, movieId: 5, cinemaId: 1, startTime: '2025-12-22T18:00:00', price: 90000 },
  { id: 11, movieId: 5, cinemaId: 2, startTime: '2025-12-22T21:15:00', price: 90000 },
  { id: 12, movieId: 5, cinemaId: 6, startTime: '2025-12-23T19:00:00', price: 90000 },

  // ===== Guardians of the Galaxy =====
  { id: 13, movieId: 6, cinemaId: 3, startTime: '2025-12-23T18:45:00', price: 80000 },
  { id: 14, movieId: 6, cinemaId: 7, startTime: '2025-12-23T21:00:00', price: 80000 },

  // ===== Avengers: Infinity War =====
  { id: 15, movieId: 7, cinemaId: 1, startTime: '2025-12-24T18:00:00', price: 95000 },
  { id: 16, movieId: 7, cinemaId: 2, startTime: '2025-12-24T21:30:00', price: 95000 },

  // ===== Avengers: Endgame =====
  { id: 17, movieId: 8, cinemaId: 1, startTime: '2025-12-25T17:30:00', price: 100000 },
  { id: 18, movieId: 8, cinemaId: 1, startTime: '2025-12-25T21:00:00', price: 100000 },
  { id: 19, movieId: 8, cinemaId: 4, startTime: '2025-12-26T19:00:00', price: 100000 },

  // ===== Spider-Man: No Way Home =====
  { id: 20, movieId: 9, cinemaId: 2, startTime: '2025-12-26T18:15:00', price: 95000 },
  { id: 21, movieId: 9, cinemaId: 6, startTime: '2025-12-26T20:45:00', price: 95000 },

  // ===== Doctor Strange: Multiverse of Madness =====
  { id: 22, movieId: 10, cinemaId: 1, startTime: '2025-12-27T18:00:00', price: 90000 },
  { id: 23, movieId: 10, cinemaId: 7, startTime: '2025-12-27T20:30:00', price: 90000 },
];
