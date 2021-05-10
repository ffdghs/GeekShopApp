import { combineReducers } from "redux";
import * as types from "./types";

const initialShopState = {
  list: [],
};

const productsReducer = (state = initialShopState, { type, payload }) => {
  switch (type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: payload.products,
      };

    default:
      return state;
  }
};

const initialHeaderState = {
  isAuthenticated:false,
}

const authReducer = (state = initialHeaderState, { type, payload}) => {
  switch(type) {
    case types.IS_AUTH:
      return {
        ...state,
        isAuthenticated: payload.auth,
      };
    default:
      return state;
  }
};

const reducers = {
  products: productsReducer,
  isAuth: authReducer,
};

export default combineReducers(reducers);
