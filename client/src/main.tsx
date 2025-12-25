import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "wouter";

const root = document.getElementById("root");
console.log("root element:", root);

ReactDOM.render(
  <Router base="/various-degrees-landing">
    <App />
  </Router>,
  document.getElementById("root"),
);
