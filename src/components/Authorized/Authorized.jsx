import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserInfo, getMenu } from "./redux";
import Loading from "../Loading";
import PrimaryLayout from "../../layouts/PrimaryLayout";

@connect(null, { getUserInfo, getMenu })
class Authorized extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    // 请求到数据之后隐藏loading
    const { getUserInfo, getMenu } = this.props;
    const promises = [getUserInfo(), getMenu()];
    Promise.all(promises).then(() => {
      this.setState({
        isLoading: false,
      });
    });
    console.log("aaa", this.props);
    console.log("bbb", getUserInfo());
    console.log("ccc", getMenu());
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : <PrimaryLayout />;
  }
}
export default Authorized;
