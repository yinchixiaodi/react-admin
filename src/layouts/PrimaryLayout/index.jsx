import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./index.less";
import logo from "@assets/images/logo.png";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
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
              <img src={logo} alt="avatar" />
              <span>admin</span>
              <GlobalOutlined />
            </div>
          </Header>
          <Content>
            <div className="layout-nav">
              <Breadcrumb>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="layout-content">Content</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default PrimaryLayout;
