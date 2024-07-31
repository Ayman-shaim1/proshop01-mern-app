import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "./userTypes";
import { ORDER_MY_LIST_RESET } from "../order/orderTypes";
import axios from "axios";
import { CART_RESET } from "../cart/cartTypes";

export const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api/users/login", { email, password }, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        // dispatch({ type: CART_RESET });
        localStorage.setItem("userInfo", JSON.stringify(data));
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_LOGIN_FAIL, payload: err });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_MY_LIST_RESET });
    dispatch({ type: USER_LIST_RESET });
    dispatch({ type: CART_RESET });
  };
};

export const register = (name, email, password) => {
  return (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    axios
      .post("/api/users", { name, email, password }, config)
      .then((resposne) => {
        const data = resposne.data;
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_REGISTER_FAIL, payload: err });
      });
  };
};

export const getUserDetails = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST });

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
      .get(`/api/users/${id}`, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_DETAILS_FAIL, payload: err });
      });
  };
};

export const updateUserProfile = (user) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
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
      .put(`/api/users/profile`, user, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: err });
      });
  };
};

export const getUserList = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    axios
      .get("/api/users", config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: USER_LIST_FAIL, payload: err });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .delete(`/api/users/${id}`, config)
      .then((response) => {
        dispatch({ type: USER_DELETE_SUCCESS });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_DELETE_FAIL, payload: err });
      });
  };
};

export const updateUser = (id, user) => {
  return (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });
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
      .put(`/api/users/${id}`, user, config)
      .then((response) => {
        const data = response.data;
        dispatch({ type: USER_UPDATE_SUCCESS });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      })
      .catch((error) => {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_UPDATE_FAIL, payload: err });
      });
  };
};
