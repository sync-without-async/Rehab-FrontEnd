import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./redux/store.js";
import "./index.scss";

import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport.js";
dayjs.extend(arraySupport);

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App className="root" />
  </Provider>,
);
