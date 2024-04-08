export const GET_ALL_PRODUCT_REQUEST = "GET_ALL_PRODUCT_REQUEST";
export const GET_ALL_PRODUCT_SUCCESS = "GET_ALL_PRODUCT_SUCCESS";
export const GET_ALL_PRODUCT_FAILURE = "GET_ALL_PRODUCT_FAILURE";
export const CART_PRODUCTS = "CART_PRODUCTS";
export const REMOVE_DATA_FROM_CART = "REMOVE_DATA_FROM_CART";
export const INCREASE_CART_QUANTITY = "INCREASE_CART_QUANTITY";
export const DECREASE_CART_QUANTITY = "DECREASE_CART_QUANTITY";

const getallProductsRequest = () => {
  return {
    type: GET_ALL_PRODUCT_REQUEST,
  };
};

const getallProductsSuccess = (data) => {
  return {
    type: GET_ALL_PRODUCT_SUCCESS,
    payload: data,
  };
};

const getallProductsFailure = () => {
  return {
    type: GET_ALL_PRODUCT_FAILURE,
  };
};

export const addToCart = (data) => ({
  type: CART_PRODUCTS,
  payload: data,
});

export const increaseCartQuantity = (id) => ({
  type: INCREASE_CART_QUANTITY,
  payload: id,
});

export const decreaseCartQuantity = (id) => ({
  type: DECREASE_CART_QUANTITY,
  payload: id,
});

export const removeDataFromCart = (id) => ({
  type: REMOVE_DATA_FROM_CART,
  payload: id,
});

export const fetchAllProducts = () => (dispatch) => {
  dispatch(getallProductsRequest());
  fetch("https://fakestoreapi.com/products")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      dispatch(getallProductsSuccess(res));
    })
    .catch((error) => {
      dispatch(getallProductsFailure());
      console.log(error);
    });
};
