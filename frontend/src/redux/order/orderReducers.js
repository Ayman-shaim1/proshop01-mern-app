import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_DETAILS_RESET,
} from "./orderTypes";

const orderCreateinitialState = {};
export const orderCreateReducer = (state = orderCreateinitialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const orderDetailsInitialState = {
  loading: true,
  orderItems: [],
  shippingAddress: {},
};
export const orderDetailsReducer = (
  state = orderDetailsInitialState,
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return { loading: true, orderItems: [], shippingAddress: {} };
    default:
      return state;
  }
};
const orderPayInitialState = {};
export const orderPayReducer = (state = orderPayInitialState, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

const orderListInitialState = {
  orders: [],
};
export const orderListReducer = (state = orderListInitialState, action) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_MY_LIST_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};

export const orderAdminListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
