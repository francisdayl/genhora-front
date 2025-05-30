import { AuthResponse, UserData } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
}

interface AuthActions {
  saveUser: (data: AuthResponse) => void;
  logout: () => void;
  getToken: () => string | null;
}

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      saveUser: (data: AuthResponse) => {
        if (!data.accessToken) return;
        const decodedUser = jwtDecode<UserData & { exp: number }>(
          data.accessToken
        );
        set({ user: decodedUser, isAuthenticated: true });
        localStorage.setItem('auth_token', data.accessToken);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('auth_token');
      },
      getToken: () => localStorage.getItem('auth_token'),
    }),
    {
      name: 'auth-storage',
    }
  )
);
