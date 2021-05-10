/**
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-redux-thunk/store.js
 */

import { composeWithDevTools } from "redux-devtools-extension";

/* eslint-disable */
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}

const store = initStore();
export default store;
