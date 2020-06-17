import { lazy } from "react";

// 路由懒加载
const Login = lazy(() => import("@pages/Login"));
const Oauth = lazy(() => import("@pages/Login/components/Oauth"));
const NotFound = lazy(() => import("@pages/404"));

// 公开路由表

const constantRoutes = [
  {
    title: "登录",
    path: "/login",
    component: Login,
  },
  {
    title: "授权登录",
    path: "/oauth",
    component: Oauth,
  },
  {
    title: "404",
    path: "*",
    component: NotFound,
  },
];

// 私有路由表
const defaultRoutes = [
  {
    title: "首页",
    path: "/",
    component: "Adimin",
  },
];

export { constantRoutes, defaultRoutes };
