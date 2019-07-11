import { SIGN_IN_SUCCESS, SIGN_IN_FAIL, SIGN_OUT_FAIL, SIGN_OUT_SUCCESS, SIGN_UP_FAIL } from './user.types';

const initialState = {
  currentUser: null,
  error: null
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, error: null };
    case SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, error: null };
    case SIGN_IN_FAIL:
    case SIGN_OUT_FAIL:
    case SIGN_UP_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};
