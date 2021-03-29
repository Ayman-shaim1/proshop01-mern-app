import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  // ORDER_PAY_RESET
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "./orderTypes";
import axios from "axios";

export const createOrder = (order) => {
  return (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token} `,
      },
    };

    axios
      .post("/api/orders", order, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_CREATE_FAIL, payload: err });
      });
  };
};

export const getOrderDetails = (id) => {
  return (dispatch, getState) => {
    
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token} `,
      },
    };

    axios
      .get(`/api/orders/${id}`, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DETAILS_FAIL, payload: err });
      });
  };
};

export const payOrder = (orderId, paymentResult) => {
  return (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .put(`/api/orders/${orderId}/pay`, paymentResult, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: err });
      });
  };
};

export const listMyOrder = () => {
  return (dispatch, getState) => {
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get(`/api/orders/myorders`, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_MY_LIST_FAIL, payload: err });
      });
  };
};

export const listOrder = () => {
  return (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get(`/api/orders/`, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_LIST_FAIL, payload: err });
      });
  };
};

export const deliverOrder = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .put(`/api/orders/${id}/deliver`,{}, config)
      .then((response) => {
        dispatch({ type: ORDER_DELIVER_SUCCESS });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ORDER_DELIVER_FAIL, payload: err });
      });
  };
};
