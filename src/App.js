import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import IndexPage from "./pages/index";
import ShopPage from "./pages/shop";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
