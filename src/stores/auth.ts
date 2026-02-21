import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  email: string;
  name?: string;
};

/** Demo credentials – only these are accepted for login */
export const DEMO_CREDENTIALS = {
  email: 'user@example.com',
  password: 'password123',
} as const;

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login(email: string, password: string) {
        const normalizedEmail = email.trim().toLowerCase();
        if (
          normalizedEmail !== DEMO_CREDENTIALS.email ||
          password !== DEMO_CREDENTIALS.password
        ) {
          return false;
        }
        set({
          user: { email: DEMO_CREDENTIALS.email, name: 'user' },
        });
        return true;
      },

      logout: () => set({ user: null }),

      isAuthenticated: () => {
        const state = useAuthStore.getState();
        return state.user != null;
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user }),
    }
  )
);
