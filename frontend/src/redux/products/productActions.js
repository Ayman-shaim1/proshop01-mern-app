import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "./productTypes";

const fetchProductsRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};
const fetchProductsSuccess = (users) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: users,
  };
};

const fetchProdcutsFail = (err) => {
  return {
    type: PRODUCT_LIST_FAIL,
    payload: err,
  };
};

export const fetchProducts = (keyword = "", pageNumber = "") => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());

    // keyword = keyword ? keyword : "";

    axios
      .get(`/api/products?keyword=${keyword}&&pageNumber=${pageNumber}`)
      .then((response) => {
        const data = response.data;
        dispatch(fetchProductsSuccess(data));
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(fetchProdcutsFail(err));
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: PRODUCT_DELETE_FAIL, payload: err });
    }
  };
};

export const createProduct = (id, product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products/`, product, config);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: PRODUCT_DELETE_FAIL, payload: err });
    }
  };
};

export const updateProduct = (id, product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/products/${id}`, product, config);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: err });
    }
  };
};

export const createProductReview = (id, review) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${id}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: err });
    }
  };
};

export const getTopProducts = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    try {
      const { data } = await axios.get("/api/products/top");
      dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: PRODUCT_TOP_FAIL, payload: err });
    }
  };
};
