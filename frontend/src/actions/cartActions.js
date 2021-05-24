import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const { data: data2 } = await axios.get(`/api/brands/${data.brand}`);

  let discount = 0;
  let threshold = 0;
  if (data2) {
    discount = data2.discount;
    threshold = data2.threshold;
  }

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      brand: data.brand,
      description: data.description,
      image: data.image,
      price: data.price,
      qty,
      discount,
      threshold,
      subtotal: data.price * qty,
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
