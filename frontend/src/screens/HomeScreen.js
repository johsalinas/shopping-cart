import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, CardGroup } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import CarouselSlider from "../components/Carousel";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <CarouselSlider></CarouselSlider>
      <h1>Productos</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <CardGroup>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={5} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        </CardGroup>
      )}
    </Fragment>
  );
};

export default HomeScreen;
