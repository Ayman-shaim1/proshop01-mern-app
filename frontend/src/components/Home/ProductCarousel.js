import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";
import { getTopProducts } from "../../redux/products/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
 
  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);
  
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products && products.length !== 0 &&
        products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-option">
                <h4>
                  {product.name}({product.price})
                </h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
