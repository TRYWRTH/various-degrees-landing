import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "wouter";

ReactDOM.render(
  <Router base="/various-degrees-landing">
    <App />
  </Router>,
  document.getElementById("root")
);

