import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
} from "../redux/products/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/products/productTypes";
import Paginate from "../components/Paginate";

function ProductListPage({ history, match }) {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteloading,
    error: productDeleteError,
    success: successProductDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateloading,
    error: productCreateError,
    success: successProductCreate,
    product,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(fetchProducts("", pageNumber));
    }
    if (successProductCreate) {
      history.push(`/admin/product/${product._id}/edit`);
    }
    if (successProductDelete) {
      console.log("change");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successProductDelete,
    successProductCreate,
    product,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    // CREATE PRODUCT :
    dispatch(createProduct({}));
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {productCreateloading && <Loader />}
      {productCreateError && (
        <Message variant="danger">{productCreateError}</Message>
      )}
      {productDeleteloading && <Loader />}
      {productDeleteError && (
        <Message variant="danger">{productDeleteError}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true}/>
        </>
      )}
    </>
  );
}

export default ProductListPage;
