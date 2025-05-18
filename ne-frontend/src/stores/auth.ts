import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      setAuth: (token: string) => {
        try {
          const decodedToken = jwtDecode<{ user: User }>(token);
          set({
            token,
            user: decodedToken.user,
            isAuthenticated: true,
            isAdmin: decodedToken.user.role === 'ADMIN',
          });
        } catch (error) {
          console.error('Invalid token:', error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false,
          });
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);