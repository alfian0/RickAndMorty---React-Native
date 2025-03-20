// authThunks.js
import { Dispatch } from "redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "./authActions";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        loginSuccess({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        })
      );
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const register =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(registerRequest());
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(
        registerSuccess({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
        })
      );
    } catch (error: any) {
      dispatch(registerFailure(error.message));
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  dispatch(logoutRequest());
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
  } catch (error: any) {
    dispatch(logoutFailure(error.message));
  }
};
