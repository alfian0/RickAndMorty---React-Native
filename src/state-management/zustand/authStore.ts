import { create } from "zustand";
import User from "@/src/types/user";
import {
  loginWithEmail,
  registerWithEmail,
  logoutUser,
} from "@/src/services/firebaseAuthService";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthAction = {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const usr = await loginWithEmail(email, password);
      set({
        user: {
          displayName: usr.displayName,
          email: usr.email,
          phoneNumber: usr.phoneNumber,
          photoURL: usr.photoURL,
        },
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ user: null, error: error.message, loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const usr = await registerWithEmail(email, password);
      set({
        user: {
          displayName: usr.displayName,
          email: usr.email,
          phoneNumber: usr.phoneNumber,
          photoURL: usr.photoURL,
        },
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({ user: null, error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();
      set({ user: null, loading: false, error: null });
    } catch (error: any) {
      set({ user: null, error: error.message, loading: false });
    }
  },
}));
