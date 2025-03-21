// authSlice.ts
import LoginInputs from "@/src/types/loginInput";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user type
type User = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
};

// Define the initial state
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginInputs>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    registerRequest(state, action: PayloadAction<LoginInputs>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    authStateChanged(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

// Export the generated action creators
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  authStateChanged,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
