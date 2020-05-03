import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Create from "../components/Create";
import Help from "../components/Help";
import Edit from "../components/Edit";
import NotFound from "../components/NotFound";
import Header from "../components/Header";

export default () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/create" component={Create} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/help" component={Help} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
