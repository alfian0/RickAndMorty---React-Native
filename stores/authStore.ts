import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
};

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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const usr = userCredential.user;
        set({
          user: {
            displayName: usr.displayName,
            email: usr.email,
            phoneNumber: usr.phoneNumber,
            photoURL: usr.photoURL,
          },
          loading: false,
        });
      })
      .catch((error) => {
        set({ error: error.message, loading: false });
      });
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const usr = userCredential.user;
        set({
          user: {
            displayName: usr.displayName,
            email: usr.email,
            phoneNumber: usr.phoneNumber,
            photoURL: usr.photoURL,
          },
          loading: false,
        });
      })
      .catch((error) => {
        set({ error: error.message, loading: false });
      });
  },

  logout: async () => {
    set({ loading: true });
    await signOut(auth);
    set({ user: null, loading: false });
  },
}));

onAuthStateChanged(auth, (user) => {
  if (user)
    useAuthStore.setState({
      user: {
        displayName: user.displayName,
        email: user?.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      },
    });
});
