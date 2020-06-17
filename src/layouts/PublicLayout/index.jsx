import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { constantRoutes } from "@conf/routes";
export default class PublicLayout extends Component {
  renderRouter = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact
        />
      );
    });
  };
  render() {
    return (
      <Suspense fallback={<h1>loading...</h1>}>
        <Switch>{this.renderRouter(constantRoutes)}</Switch>
      </Suspense>
    );
  }
}
