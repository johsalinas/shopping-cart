import React, { Fragment, useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import CartScreen from "../screens/CartScreen";
import { useSelector } from "react-redux";
const Header = () => {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => {
    setToggled(!isToggled);
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const numberOfItems =
    cartItems.reduce((acc, item) => acc * 1 + item.qty * 1, 0) * 1;

  return (
    <Fragment>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="/"></Navbar.Brand>
        <img
          src="img/logo_lider2.webp"
          alt="logo_lider"
          width="110"
          height="50"
        ></img>

        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Button onClick={() => toggleTrueFalse()}>
          <i className="fas fa-shopping-cart"></i>
          Carrito{numberOfItems > 0 ? "(" + numberOfItems + ")" : ""}
        </Button>
        <ul></ul>
      </Navbar>

      <div
        style={{
          position: "fixed",
          right: "0",
          zIndex: "1",
          background: "white",
        }}
      >
        {isToggled && <CartScreen></CartScreen>}
      </div>
    </Fragment>
  );
};

export default Header;
