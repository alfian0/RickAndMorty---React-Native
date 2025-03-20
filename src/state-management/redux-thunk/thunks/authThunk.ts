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
} from "../../redux/action/authActions";
import {
  loginWithEmail,
  registerWithEmail,
  logoutUser,
} from "@/src/services/firebaseAuthService";

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
      const user = await loginWithEmail(email, password);
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
      const user = await registerWithEmail(email, password);
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
    await logoutUser();
    dispatch(logoutSuccess());
  } catch (error: any) {
    dispatch(logoutFailure(error.message));
  }
};
