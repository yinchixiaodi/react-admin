import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./index.less";
import logo from "@assets/images/logo.png";
import SideMenu from "../SideMenu";
const { Header, Sider, Content } = Layout;
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

  render() {
    const { user } = this.props;
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SideMenu />
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
