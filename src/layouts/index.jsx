import React, { Component } from "react";
import { connect } from "react-redux";
import PublicLayout from "./PublicLayout";
import PrimaryLayout from "./PrimaryLayout";

@connect((state) => ({ token: state.token }))
class Layouts extends Component {
  render() {
    const { token } = this.props;
    return token ? <PrimaryLayout /> : <PublicLayout />;
  }
}
export default Layouts;
