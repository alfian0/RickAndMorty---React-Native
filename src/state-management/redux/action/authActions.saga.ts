// authActions.js
import User from "@/src/types/user";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../types/actionTypes";

export const loginRequest = (email: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (user: User) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = (email: string, password: string) => ({
  type: REGISTER_REQUEST,
  payload: { email, password },
});

export const registerSuccess = (user: User) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error: any) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: any) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});
