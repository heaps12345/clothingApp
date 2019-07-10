import { TOGGLE_CART_HIDDEN, ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM, CLEAR_ENTIRE_CART } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const initialState = {
  hidden: true,
  cartItems: []
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case ADD_ITEM:
      return { ...state, cartItems: addItemToCart(state.cartItems, payload) };
    case REMOVE_ITEM:
      return { ...state, cartItems: removeItemFromCart(state.cartItems, payload) };
    case CLEAR_ITEM_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter(cartItem => cartItem.id !== payload.id) };
    case CLEAR_ENTIRE_CART:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
