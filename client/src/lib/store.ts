import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BookingStatus = 'received' | 'confirmed' | 'assigning' | 'en_route' | 'arrived' | 'completed';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  pickupLocation: string;
  dropoffLocation?: string;
  serviceType: string;
  notes?: string;
  status: BookingStatus;
  createdAt: number;
  driver?: {
    name: string;
    vehicle: string;
    plate: string;
    image: string;
  };
  eta?: string;
}

interface BookingStore {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  getBookingByPhone: (phone: string) => Booking | undefined;
  getBookingById: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (bookingData) => {
        const id = 'BK-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const newBooking: Booking = {
          ...bookingData,
          id,
          createdAt: Date.now(),
          status: 'received',
        };
        set((state) => ({ bookings: [newBooking, ...state.bookings] }));
        return id;
      },
      updateBookingStatus: (id, status) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        }));
      },
      getBookingByPhone: (phone) => {
        // Simple exact match for demo, stripping non-digits could be better
        return get().bookings.find((b) => b.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
      },
      getBookingById: (id) => {
        return get().bookings.find((b) => b.id === id);
      },
    }),
    {
      name: 'poorman-bookings-storage',
    }
  )
);
