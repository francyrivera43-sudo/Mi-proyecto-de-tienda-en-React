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

      register: (newUser) => {
        const exists = get().users.some(u => u.email === newUser.email);
        if (exists) return false;

        const updatedUsers = [...get().users, newUser];

        set({
          users: updatedUsers,
          user: newUser, // 👈 IMPORTANTE: lo deja logueado
          isAuthenticated: true
        });

        return true;
      },

      login: (email, password) => {
        const user = get().users.find(
          u => u.email === email && u.password === password
        );

        if (!user) return false;

        set({
          user,
          isAuthenticated: true
        });

        return true;
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);