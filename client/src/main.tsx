import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "wouter";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root,
);
