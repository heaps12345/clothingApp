import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  GOOGLE_SIGN_IN_START,
  EMAIL_SIGN_IN_START,
  CHECK_USER_SESSION,
  SIGN_Out_START,
  SIGN_UP_START,
  SIGN_UP_SUCCESS
} from './user.types';

import { signInSuccess, signInFail, signOutSuccess, signOutFail, signUpFail, signUpSuccess } from './user.actions';

import { auth, googleProvider, createUserFirestoreDocument, getCurrentUser } from '../../firebase/firebase.utils';

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserFirestoreDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signinWithGoogle);
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* onEmailSigninStart() {
  yield takeLatest(EMAIL_SIGN_IN_START, signinWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFail(err));
  }
}

export function* onsignOutStart() {
  yield takeLatest(SIGN_Out_START, signOut);
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (err) {
    yield put(signUpFail(err));
  }
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(onCheckUserSession),
    call(onsignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
