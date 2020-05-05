import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "../components/Dashboard";
import Create from "../components/Create";
import Help from "../components/Help";
import Edit from "../components/Edit";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

export const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={Login} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <Route path="/help" component={Help} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
