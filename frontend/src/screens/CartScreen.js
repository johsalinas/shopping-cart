import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
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
    <Row>
      <Col md={8}>
        <h1>Carrito</h1>
        {cartItems.length === 0 ? (
          <Message>El carrito está vacío.</Message>
        ) : (
          <ListGroup variant="flush">
            <Row>
              <Col md={2}></Col>
              <Col md={4}>description</Col>
              <Col md={2}>brand</Col>
              <Col md={2}>price</Col>
              <Col md={1}></Col>
            </Row>
            {cartItems.map((item) => (
              <ListGroup.Item variant="dark" key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.product} fluid rounded />
                  </Col>
                  <Col md={4}>{item.description}</Col>
                  <Col md={2}>{item.brand}</Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={1}>
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
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Total></Total>
    </Row>
  );
};

export default CartScreen;
