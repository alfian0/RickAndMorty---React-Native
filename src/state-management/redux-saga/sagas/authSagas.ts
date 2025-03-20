// sagas/authSagas.ts
import { takeLatest, put, call } from "redux-saga/effects";
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
} from "../../redux-toolkit/slices/saga/authSlice"; // Import actions from your slice
import {
  loginWithEmail,
  registerWithEmail,
  logoutUser,
} from "@/src/services/firebaseAuthService";
import User from "@/src/types/user";

// Login saga
function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(loginWithEmail, email, password);
    yield put(
      loginSuccess({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      })
    );
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

// Register saga
function* registerSaga(action: ReturnType<typeof registerRequest>) {
  try {
    const { email, password } = action.payload;
    const user: User = yield call(registerWithEmail, email, password);
    yield put(
      registerSuccess({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      })
    );
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

// Logout saga
function* logoutSaga() {
  try {
    yield call(logoutUser);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutFailure(error.message));
  }
}

// Watcher sagas
export function* watchLogin() {
  yield takeLatest(loginRequest.type, loginSaga);
}

export function* watchRegister() {
  yield takeLatest(registerRequest.type, registerSaga);
}

export function* watchLogout() {
  yield takeLatest(logoutRequest.type, logoutSaga);
}
