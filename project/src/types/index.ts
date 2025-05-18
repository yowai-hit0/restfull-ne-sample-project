export type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  isbn: string;
  publishedDate: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Booking = {
  id: string;
  userId: string;
  bookId: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';
  createdAt: string;
  updatedAt: string;
  book?: Book;
  user?: User;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

export type BookFilters = {
  search?: string;
  available?: boolean;
  sort?: 'title' | 'author' | 'publishedDate';
  order?: 'asc' | 'desc';
};