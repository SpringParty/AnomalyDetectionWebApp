// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(<App />, document.getElementById("root"));

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
