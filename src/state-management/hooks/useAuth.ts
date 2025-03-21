import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux-saga/authStore"; // Import your store types
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  authStateChanged,
} from "../redux-toolkit/slices/saga/authSlice";
import User from "@/src/types/user";
import LoginInputs from "@/src/types/loginInput";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const loginUser = (input: LoginInputs) => {
    dispatch(loginRequest(input));
  };

  const registerUser = (input: LoginInputs) => {
    dispatch(registerRequest(input));
  };

  const logoutUser = () => {
    dispatch(logoutRequest());
  };

  const changedUser = (user: User) => {
    dispatch(authStateChanged(user));
  };

  return {
    user,
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    changedUser,
  };
};
