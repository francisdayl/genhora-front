import { UserData } from '@/types/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
}

interface AuthActions {
  saveUser: (data: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      saveUser: async (data: UserData) => {
        set({ user: data, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
