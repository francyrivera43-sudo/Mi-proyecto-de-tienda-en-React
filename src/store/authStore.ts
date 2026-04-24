import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;

  register: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,

      // REGISTRO
      register: (newUser) => {
        const exists = get().users.find(u => u.email === newUser.email);
        if (exists) return false;

        set(state => ({
          users: [...state.users, newUser]
        }));

        return true;
      },

      // LOGIN REAL
      login: (email, password) => {
        const user = get().users.find(
          u => u.email === email && u.password === password
        );

        if (!user) return false;

        set({ user, isAuthenticated: true });
        return true;
      },

      // LOGOUT
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);