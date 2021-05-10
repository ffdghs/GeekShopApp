import React from "react";
import ReactDom from "react-dom";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

ReactDom.render(<App />, document.getElementById("root"));

module.hot.accept();
