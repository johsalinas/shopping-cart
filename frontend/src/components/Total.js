import React, { Fragment } from "react";
import { Col, Row, ListGroup, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import clonedeep from "lodash.clonedeep";

const Total = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  let cartCloned = clonedeep(cartItems);

  //group cart items by brand
  let result = Object.values(
    cartCloned.reduce(
      (r, o) => (
        r[o.brand]
          ? (r[o.brand].subtotal += o.subtotal)
          : (r[o.brand] = { ...o }),
        r
      ),
      {}
    )
  );

  let messageBox;
  let maxApplicableDiscount = 0;
  let threshold = 0;
  let brand = "";

  if (result.length >= 1) {
    // select brands that meet the requirement to apply discount
    let discountBrands = Object.keys(result)
      .filter((el) => {
        return (
          result[el].threshold > 0 &&
          result[el].threshold - result[el].subtotal <= 0
        );
      })
      .map((el) => result[el]);

    //find brand with highest applicable discount
    if (discountBrands.length > 0) {
      let maxDiscountBrand = discountBrands.reduce((max, curr) =>
        max.discount > curr.discount ? max : curr
      );

      maxApplicableDiscount = maxDiscountBrand.discount;
      threshold = maxDiscountBrand.threshold;
      brand = maxDiscountBrand.brand;
    }

    //find the brand with the highest discount of the basket regardless of whether it meets the requirement or not
    let maxDiscount = result.reduce((max, curr) =>
      max.discount > curr.discount ? max : curr
    );

    messageBox = (
      <Row>
        <Col md={8}>
          {maxApplicableDiscount > 0 && (
            <h6>
              Se aplicó un descuento de ${maxApplicableDiscount} por haber
              comprado ${threshold} de productos {brand}!
            </h6>
          )}
        </Col>
        <Col md={8}>
          {maxDiscount.discount > 0 &&
            maxDiscount.threshold - maxDiscount.subtotal >= 0 && (
              <h6>
                "Agrega {maxDiscount.threshold - maxDiscount.subtotal} más en
                productos
                {" " + maxDiscount.brand} y aprovecha un descuento total de{" "}
                {maxDiscount.discount} en tu compra!"
              </h6>
            )}
        </Col>
      </Row>
    );
  }

  const numberOfItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(0);

  const total = subtotal - maxApplicableDiscount;

  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h4>Subtotal ({numberOfItems}) items</h4>${subtotal}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Total</h2>${total}
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
      <Fragment>{messageBox}</Fragment>
    </Col>
  );
};

export default Total;
