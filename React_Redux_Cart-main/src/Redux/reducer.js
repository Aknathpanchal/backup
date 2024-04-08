import {
  GET_ALL_PRODUCT_FAILURE,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  CART_PRODUCTS,
  REMOVE_DATA_FROM_CART,
  INCREASE_CART_QUANTITY,
  DECREASE_CART_QUANTITY,
} from "./action";

const initialState = {
  storeData: [],
  cartData: [],
  loading: false,
  error: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case GET_ALL_PRODUCT_REQUEST: {
      return {
        ...state,
        storeData: [],
        loading: true,
        error: false,
      };
    }

    case GET_ALL_PRODUCT_SUCCESS: {
      return {
        ...state,
        storeData: payload,
        loading: false,
        error: false,
      };
    }

    case GET_ALL_PRODUCT_FAILURE: {
      return {
        ...state,
        storeData: [],
        loading: false,
        error: true,
      };
    }

    case CART_PRODUCTS: {
      return {
        ...state,
        cartData: [...state.cartData, payload],
      };
    }

    case INCREASE_CART_QUANTITY: {
      return {
        ...state,
        cartData: state.cartData.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case DECREASE_CART_QUANTITY: {
      return {
        ...state,
        cartData: state.cartData.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }

    case REMOVE_DATA_FROM_CART: {
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id !== payload),
      };
    }
    default:
      return state;
  }
};
