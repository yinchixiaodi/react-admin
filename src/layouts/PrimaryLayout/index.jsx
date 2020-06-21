import React, { Component } from "react";
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { withRouter } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./index.less";
import logo from "@assets/images/logo.png";
import SideMenu from "../SideMenu";
import { defaultRoutes } from "@conf/routes";
import { AuthorizedRouter } from "@comps/Authorized";
const { Header, Sider, Content } = Layout;
@withRouter
@connect((state) => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  getCurrentRoute = (permissionList, pathname) => {
    // console.log(permissionList);
    for (let i = 0; i < permissionList.length; i++) {
      const route = permissionList[i];
      // 找一级菜单
      if (route.path === pathname) {
        return {
          ...route,
          children: undefined,
        };
      }
      const { children } = route;
      // 找二级菜单
      if (children && children.length) {
        for (let j = 0; j < children.length; j++) {
          const item = children[j];
          if (!item.path) continue;
          // 拼接二级菜单完成路径
          const currentPath = route.path + item.path;
          const currentRoute = {
            ...item,
            path: currentPath,
          };
          const match = matchPath(pathname, currentRoute);
          if (match) {
            return {
              ...route,
              children: currentRoute,
            };
          }
        }
      }
    }
  };
  render() {
    const {
      user,
      location: { pathname },
    } = this.props;
    // 先找私有静态路由 首页
    let currentRoute = this.getCurrentRoute(defaultRoutes, pathname);
    if (!currentRoute) {
      currentRoute = this.getCurrentRoute(user.permissionList, pathname);
    }
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SideMenu currentRoute={currentRoute} />
        </Sider>
        <Layout className="layout-right">
          <Header className="layout-right-header">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
            <div className="header-right">
              <img src={user.avatar} alt="avatar" />
              <span>{user.name}</span>
              <GlobalOutlined />
            </div>
          </Header>
          <Content>
            <div className="layout-nav">
              {/* 如果是二级菜单就用面包屑导航 */}
              {currentRoute.children && (
                <Breadcrumb>
                  <Breadcrumb.Item>{currentRoute.name}</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {currentRoute.children.name}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
              {/* 一级菜单和二级菜单都需要显示的 */}
              <h3>
                {currentRoute.children
                  ? currentRoute.children.name
                  : currentRoute.name}
              </h3>
            </div>
            <div className="layout-content">
              <AuthorizedRouter permissionList={user.permissionList} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PrimaryLayout;
