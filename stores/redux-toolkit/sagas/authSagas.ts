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
} from "../authSlice"; // Import actions from your slice
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

// Login saga
function* loginSaga(action: ReturnType<typeof loginRequest>) {
  try {
    const { email, password } = action.payload;
    const userCredential: UserCredential = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );
    const user = userCredential.user;
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
    const userCredential: UserCredential = yield call(
      createUserWithEmailAndPassword,
      auth,
      email,
      password
    );
    const user = userCredential.user;
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
    yield call(signOut, auth);
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
