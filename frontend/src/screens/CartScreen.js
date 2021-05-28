import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Total from "../components/Total";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      <div>
        <h1>Carrito</h1>
        {cartItems.length === 0 ? (
          <Message>El carrito está vacío.</Message>
        ) : (
          <div variant="flush">
            {cartItems.map((item) => (
              <div key={item.product}>
                <div class="row">
                  <div class="col">
                    <Image
                      src={"http://" + item.image}
                      alt={item.product}
                      fluid
                      className="round-img cartImg"
                    />
                  </div>
                  <div class="col">
                    <h6>{item.description}</h6>
                  </div>
                  <div class="col d-none d-sm-block">
                    <h6>{item.brand}</h6>
                  </div>
                  <div class="col">
                    <h6>${item.price}</h6>
                  </div>
                  <div class="col">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div class="col">
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Total></Total>
      </div>
    </div>
  );
};

export default CartScreen;
