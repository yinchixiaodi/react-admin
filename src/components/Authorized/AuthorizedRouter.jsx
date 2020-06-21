import React, { Component, Suspense } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Spin } from "antd";
import asyncComps from "@conf/asyncComps";
import { defaultRoutes } from "@conf/routes";

class AuthorizedRouter extends Component {
  static propTypes = {
    permissionList: PropTypes.array.isRequired,
  };
  renderRoute = (menuList, parentPath = "") => {
    return menuList.reduce((routes, menu) => {
      // console.log(routes, menu);
      const { component, redirect, children, path } = menu;
      // console.log(asyncComps, component);
      // 判断有没有路由组件
      if (component) {
        const Comp = asyncComps[component]();
        // 如果有路由组件
        routes.push(
          <Route key={path} path={parentPath + path} component={Comp} exact />
        );
      }
      // 判断有没有子组件
      if (children && children.length) {
        routes = routes.concat(this.renderRoute(children, path));
      }
      // 判断 redirect
      if (redirect && redirect !== "noredirect") {
        // 说明要重定向到redirect
        // 只有路径是from的时候才会重定向到to
        routes.push(<Redirect key={path} from={path} to={redirect} />);
      }
      return routes;
    }, []);
  };
  render() {
    const { permissionList } = this.props;
    return (
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          {this.renderRoute(defaultRoutes)}
          {this.renderRoute(permissionList)}
        </Switch>
      </Suspense>
    );
  }
}
export default AuthorizedRouter;
