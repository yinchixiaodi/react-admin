import React, { Component } from "react";
import { connect } from "react-redux";
import { loginSync } from "@redux/actions/login";
@connect(null, { loginSync })
class Oauth extends Component {
  componentDidMount() {
    console.log(this.props.location);
    // 获取token
    const token = this.props.location.search.split("=")[1];
    // 保存token
    this.props.loginSync(token);
    // 将token保存到本地
    window.localStorage.setItem("user_token", token);
    // 跳转到首页
    this.props.history.replace("/");
  }
  render() {
    return <div>授权登录中...</div>;
  }
}
export default Oauth;
