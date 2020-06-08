import React, { Component } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
export default class Subject extends Component {
  render() {
    return (
      <div className="subject">
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      </div>
    );
  }
}
