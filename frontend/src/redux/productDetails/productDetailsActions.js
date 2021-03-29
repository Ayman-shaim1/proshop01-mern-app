import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from "./productDetailsTypes";
import axios from "axios";

const fetchProductDetailsRequest = () => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  };
};

const fetchProductDetailsSuccess = (product) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: product,
  };
};
const fetchProductDetailsFail = (error) => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    payload: error,
  };
};

const fetchProductDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchProductDetailsRequest());
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        const product = response.data;
        dispatch(fetchProductDetailsSuccess(product));
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(fetchProductDetailsFail(err));
      });
  };
};
export default fetchProductDetails;
