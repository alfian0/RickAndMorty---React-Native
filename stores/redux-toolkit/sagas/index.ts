// sagas/index.ts
import { all } from "redux-saga/effects";
import { watchLogin, watchRegister, watchLogout } from "./authSagas";

// Root saga
export default function* rootSaga() {
  yield all([watchLogin(), watchRegister(), watchLogout()]);
}
