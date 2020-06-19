import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import icons from "@conf/icons";
import { defaultRoutes } from "@conf/routes";

const { SubMenu } = Menu;
@withRouter
@connect((state) => ({ permissionList: state.user.permissionList }))
class SideMenu extends Component {
  randerMenu = (menuList, parentPath = "") => {
    return menuList.map((menu) => {
      const { children, icon, path, name, hidden } = menu;
      // 过滤不需要显示的子菜单
      if (hidden) return null;
      const Icon = icons[icon];
      if (children && children.length) {
        // 有二级菜单
        return (
          <SubMenu key={path} icon={<Icon />} title={name}>
            {this.randerMenu(children, path)}
          </SubMenu>
        );
      } else {
        // 只有一级菜单
        const currentPath = parentPath + path;
        return (
          <Menu.Item key={currentPath} icon={Icon ? <Icon /> : null}>
            <Link to={currentPath}>{name}</Link>
          </Menu.Item>
        );
      }
    });
  };
  // 默认展开的菜单的地址
  getOpenKeys = (pathname) => {
    console.log(pathname);
    if (pathname === "/") return [];
    return ["/" + pathname.split("/")[1]];
  };
  render() {
    const {
      permissionList,
      location: { pathname },
    } = this.props;
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]} // 默认选中的菜单
        defaultOpenKeys={this.getOpenKeys(pathname)} // 默认展示的菜单（值是数组）
      >
        {this.randerMenu(defaultRoutes)}
        {this.randerMenu(permissionList)}
      </Menu>
    );
  }
}
export default SideMenu;
