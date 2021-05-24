import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Total from "../components/Total";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Carrito</h1>
        <Link to="/">Volver</Link>
        {cartItems.length === 0 ? (
          <Message>
            El carrito está vacío. <Link to="/">Volver</Link>
          </Message>
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
              <ListGroup.Item key={item.product}>
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
