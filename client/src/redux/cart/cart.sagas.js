import { all, call, takeLatest, put } from 'redux-saga/effects';

import { SIGN_OUT_SUCCESS } from '../user/user.types';
import { clearEntireCart } from './cart.actions';

export function* clearCartOnsignOut() {
  yield put(clearEntireCart());
}

export function* onsignOutSuccess() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnsignOut);
}

export function* cartSagas() {
  yield all([call(onsignOutSuccess)]);
}
