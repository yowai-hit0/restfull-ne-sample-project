import api from '../lib/axios';
import { ApiResponse, Booking, PaginatedResponse } from '../types';

export const getBookings = async (
  page = 1,
  limit = 10
): Promise<ApiResponse<PaginatedResponse<Booking>>> => {
  const response = await api.get<ApiResponse<PaginatedResponse<Booking>>>('/bookings', {
    params: { page, limit },
  });
  return response.data;
};

export const getUserBookings = async (
  page = 1,
  limit = 10
): Promise<ApiResponse<PaginatedResponse<Booking>>> => {
  const response = await api.get<ApiResponse<PaginatedResponse<Booking>>>('/bookings/user', {
    params: { page, limit },
  });
  return response.data;
};

export const getBooking = async (id: string): Promise<ApiResponse<Booking>> => {
  const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
  return response.data;
};

export const createBooking = async (bookingData: {
  bookId: string;
  startDate: string;
  endDate: string;
}): Promise<ApiResponse<Booking>> => {
  const response = await api.post<ApiResponse<Booking>>('/bookings', bookingData);
  return response.data;
};

export const updateBookingStatus = async (
  id: string,
  status: 'APPROVED' | 'REJECTED' | 'RETURNED'
): Promise<ApiResponse<Booking>> => {
  const response = await api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status });
  return response.data;
};

export const deleteBooking = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/bookings/${id}`);
  return response.data;
};