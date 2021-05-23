import React, { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const Product = ({ product, history }) => {
  const [qty, setQty] = useState(1);
  const addToCartHandler = () => {
    history.push(`/cart/${product.id}?qty=${qty}`);
  };

  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${product.id}`}>
        <Card.Img src={product.image} />
      </a>

      <Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>
            <a href={`/product/${product.id}`}>
              <Card.Title as="div">
                <strong>{product.description}</strong>
              </Card.Title>
            </a>
            <Card.Text as="h3">${product.price}</Card.Text>
          </ListGroupItem>
          <Card.Subtitle className="mb-2 text-muted">
            {product.brand}
          </Card.Subtitle>
          <ListGroup.Item>
            <Row>
              <Col>Cantidad: </Col>
              <Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroupItem>
            <Button
              onClick={addToCartHandler}
              className="btn-block"
              type="button"
            >
              Agregar
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Product;
