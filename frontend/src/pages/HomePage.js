import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Home/Product";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { fetchProducts } from "../redux/products/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/Home/ProductCarousel";
import Meta from "../components/Meta";

function HomePage({ match }) {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="  btn btn-light">
          Go back
        </Link>
      )}
      <h1 className="mb-4 mt-4">Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>
          <Message variant="danger">{error}</Message>
        </h3>
      ) : (
        <>
          <Row>
            {products.map((product, i) => (
              <Col sm={12} md={6} lg={4} xl={3} key={i}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
}

export default HomePage;
