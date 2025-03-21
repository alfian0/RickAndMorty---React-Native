import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux-saga/authStore"; // Import your store types
import {
  loginRequest,
  registerRequest,
  logoutRequest,
} from "../redux-toolkit/slices/saga/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const loginUser = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };

  const registerUser = (email: string, password: string) => {
    dispatch(registerRequest({ email, password }));
  };

  const logoutUser = () => {
    dispatch(logoutRequest());
  };

  return { user, loading, error, loginUser, registerUser, logoutUser };
};
