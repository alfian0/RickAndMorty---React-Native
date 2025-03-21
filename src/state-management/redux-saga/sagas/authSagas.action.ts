// sagas/authSagas.ts
import { takeLatest, put, call } from "redux-saga/effects";
import {
  loginWithEmail,
  registerWithEmail,
  logoutUser,
} from "@/src/services/firebaseAuthService";
import User from "@/src/types/user";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../../redux/types/actionTypes";

// Login saga
function* loginSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(loginWithEmail, email, password);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      },
    });
  } catch (error: any) {
    yield put({ type: LOGIN_FAILURE, payload: error.message });
  }
}

// Register saga
function* registerSaga(action: any) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(registerWithEmail, email, password);
    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      },
    });
  } catch (error: any) {
    yield put({ type: REGISTER_FAILURE, payload: error.message });
  }
}

// Logout saga
function* logoutSaga() {
  try {
    yield call(logoutUser);
    yield put({ type: LOGOUT_SUCCESS });
  } catch (error: any) {
    yield put({ type: LOGOUT_FAILURE, payload: error.message });
  }
}

// Watcher sagas
export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}
