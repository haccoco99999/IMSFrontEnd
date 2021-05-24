import React from "react";
import ReactDOM from "react-dom";
import {
  Collapse,
  Popover,
  Toast,
  Tooltip,
  Alert,
  Modal,
  Dropdown,
} from "bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
