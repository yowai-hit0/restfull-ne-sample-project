import api from '../lib/axios';
import { ApiResponse, Book, BookFilters, PaginatedResponse } from '../types';

export const getBooks = async (
  page = 1, 
  limit = 10, 
  filters?: BookFilters
): Promise<ApiResponse<PaginatedResponse<Book>>> => {
  const params = { page, limit, ...filters };
  const response = await api.get<ApiResponse<PaginatedResponse<Book>>>('/books', { params });
  return response.data;
};

export const getBook = async (id: string): Promise<ApiResponse<Book>> => {
  const response = await api.get<ApiResponse<Book>>(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: Partial<Book>): Promise<ApiResponse<Book>> => {
  const response = await api.post<ApiResponse<Book>>('/books', bookData);
  return response.data;
};

export const updateBook = async (id: string, bookData: Partial<Book>): Promise<ApiResponse<Book>> => {
  const response = await api.put<ApiResponse<Book>>(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/books/${id}`);
  return response.data;
};