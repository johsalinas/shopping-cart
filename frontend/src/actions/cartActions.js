import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const discount = await axios.get(`/api/brands/${data.brand}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      brand: data.brand,
      description: data.description,
      image: data.image,
      price: data.price,
      qty,
      discount: discount.data,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
