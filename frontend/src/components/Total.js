import React from "react";
import { Col, ListGroup, Button, Card } from "react-bootstrap";

const Total = ({ cartItems }) => {
  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(0)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
            >
              Proceder al pago
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default Total;
