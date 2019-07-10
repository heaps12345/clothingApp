import { FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_FAIL } from './shop.types';

const initialState = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

export const shopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COLLECTIONS_START:
      return { ...state, isFetching: true };
    case FETCH_COLLECTIONS_SUCCESS:
      return { ...state, collections: payload, isFetching: false };
    case FETCH_COLLECTIONS_FAIL:
      return { ...state, isFetching: false, errorMessage: payload };
    default:
      return state;
  }
};
