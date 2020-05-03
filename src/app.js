import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import getVisibleExpenses from "./selectors/expenses";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();
const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById("app"));
