import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
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
      <div>
        <div class="row">
          {maxApplicableDiscount > 0 && (
            <h6>
              Se aplicó un descuento de ${maxApplicableDiscount} por haber
              comprado ${threshold} de productos {brand}!
            </h6>
          )}
          <div class="row">
            {maxDiscount.discount > 0 &&
              maxDiscount.threshold - maxDiscount.subtotal >= 0 && (
                <h6>
                  Agrega {maxDiscount.threshold - maxDiscount.subtotal} más en
                  productos
                  {" " + maxDiscount.brand} y aprovecha un descuento total de{" "}
                  {maxDiscount.discount} en tu compra!
                </h6>
              )}
          </div>
        </div>
      </div>
    );
  }

  const numberOfItems =
    cartItems.reduce((acc, item) => acc * 1 + item.qty * 1, 0) * 1;

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(0);

  const total = subtotal - maxApplicableDiscount;

  const totalBox = (
    <Fragment>
      <div>
        <h6>Subtotal ({numberOfItems}) items</h6>
        <h6>${subtotal}</h6>
      </div>
      <div>
        <h5>Total</h5>
        <h5>${total}</h5>
      </div>
      <div>
        <Button
          type="button"
          className="btn-block"
          disabled={cartItems.length === 0}
        >
          Proceder al pago
        </Button>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="cart d-flex justify-content-around">
        {numberOfItems > 0 ? totalBox : <></>}
      </div>
      {messageBox}
    </Fragment>
  );
};

export default Total;
