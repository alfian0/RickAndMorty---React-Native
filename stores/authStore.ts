import { create } from "zustand";

interface AuthStore {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication success (you can replace this with a real API call)
      if (email === "test@example.com" && password === "password123") {
        set({ user: { email }, loading: false });
      } else {
        set({ user: null, loading: false });
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Assume registration always succeeds
      set({ user: { email }, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
    set({ user: null, loading: false });
  },
}));
