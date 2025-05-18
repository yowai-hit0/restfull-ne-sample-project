import api from '../lib/axios';
import { ApiResponse, LoginCredentials, RegisterCredentials, User } from '../types';

export const login = async (credentials: LoginCredentials): Promise<ApiResponse<{ token: string }>> => {
  const response = await api.post<ApiResponse<{ token: string }>>('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterCredentials): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>('/auth/register', userData);
  return response.data;
};

export const verifyOtp = async (email: string, otp: string): Promise<ApiResponse<{ token: string }>> => {
  const response = await api.post<ApiResponse<{ token: string }>>('/auth/verify-otp', { email, otp });
  return response.data;
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>('/auth/change-password', { oldPassword, newPassword });
  return response.data;
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>('/users/profile');
  return response.data;
};