import React, { Component } from "react";
import { Upload as AntdUpload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js";
import "./index.less";
import { request } from "express";
const MAX_VIDEO_SIZE = 35 * 1024 * 1024;
export default class Upload extends Component {
  beforeUpload = (file, fileList) => {
    // 在上传视频之前限制视频的大小
    return new Promise((resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.warn("上传的文件大小不能超过35MB");
        return reject();
      }
      return resolve(file);
    });
  };
  // 自定义上传视频的方案
  customRequest = () => {
    var putExtra = {
      fname: "", // 文件原名
      // params: {}, // 放置自定义变量
      mimeType: ["video/mp4"],
    };
    const config = {
      // useCdnDomain: true,
      region: qiniu.region.z1,
    };
    // const observable = qiniu.upload(file, key, token, putExtra, config);
    // 创建上传过程中触发回调函数对象
    const observer = {};
    // 开始上传
    // const subscription = observable.subscribe(next, error, complete);
    // subscription.unsubscribe(); // 上传取消
  };
  render() {
    return (
      <div>
        <AntdUpload
          className="my-upload"
          beforeUpload={this.beforeUpload}
          customRequest={this.customRequest}
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </AntdUpload>
      </div>
    );
  }
}
