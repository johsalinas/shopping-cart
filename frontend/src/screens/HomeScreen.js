import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Productos</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={5} lg={4} xl={3}>
            <Product product={product} history={history}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
