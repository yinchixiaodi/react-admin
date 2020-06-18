import React, { Component } from "react";
import { Upload as AntdUpload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js";
// 轻量级的库，专门用来生成唯一id的库
import { nanoid } from "nanoid";
import { reqGetToken } from "@api/edu/upload";
import qiniuConfig from "@conf/qiniu";
import "./index.less";

const MAX_VIDEO_SIZE = 35 * 1024 * 1024;
export default class Upload extends Component {
  // 从本地读取token
  getLocalUploadToken = () => {
    console.log(this);
    try {
      // 从本地读取数据、解析
      const { uploadToken, expires } = JSON.parse(
        localStorage.getItem("upload_token")
      );
      // 判断是否过期
      console.log("getLocalUploadToken", this);
      if (!this.isValidUploadToken(expires)) {
        return new Error("token已过期");
      }
      // 成功
      return {
        uploadToken,
        expires,
      };
    } catch (error) {
      console.log(error, "获取失败");
      // 失败
      return {
        uploadToken: "",
        expires: 0,
      };
    }
  };
  componentDidMount() {
    // this.state = this.getLocalUploadToken();
  }
  // 判断token是否过期
  isValidUploadToken = (expires) => {
    // 过期时间比当前时间大，说明还没有过期
    return expires > Date.now();
  };
  state = {
    ...this.getLocalUploadToken(),
  };
  // 保存tokens
  saveUploadToken = (uploadToken, expires) => {
    const data = {
      uploadToken,
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000,
    };
    this.setState(data);
    // 设置 localStorage
    localStorage.setItem("upload_token", JSON.stringify(data));
  };
  // 发送请求
  fetchUploadToken = async () => {
    const { uploadToken, expires } = await reqGetToken();
    this.saveUploadToken(uploadToken, expires);
  };

  beforeUpload = (file, fileList) => {
    // 在上传视频之前限制视频的大小
    return new Promise((resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.warn("上传的文件大小不能超过35MB");
        return reject();
      }
      // 在上传成功之前调用方法，得到token
      // 判断当前token是否过期了
      const { expires } = this.state;
      // console.log(expires);
      // console.log("beforeUpload", this.isValidUploadToken);
      if (!this.isValidUploadToken(expires)) {
        this.fetchUploadToken();
      }
      return resolve(file);
    });
  };
  // 自定义上传视频的方案
  customRequest = ({ file, onProgress, onSuccess, onError }) => {
    const { uploadToken } = this.state;
    console.log(uploadToken);
    const key = nanoid(10);
    var putExtra = {
      fname: "", // 文件原名
      // params: {}, // 放置自定义变量
      mimeType: ["video/mp4"],
    };
    const config = {
      // useCdnDomain: true,
      region: qiniuConfig.region,
    };
    //创建上传文件的对象
    const observable = qiniu.upload(file, key, uploadToken, putExtra, config);
    // 创建上传过程中触发回调函数对象
    const observer = {
      next(res) {
        // 上传过程中调用的回调函数
        const percent = res.total.percent.toFixed(2);
        // 更新上传进度
        onProgress({ percent }, file);
      },
      error(err) {
        // 上传失败调用的
        onError(err);
        message.success("上传失败");
      },
      complete: (res) => {
        // 上传成功调用的
        onSuccess(res);
        message.success("上传成功");
        const video = qiniuConfig.prefix_url + res.key;
        this.props.onChange(video);
      },
    };
    // 开始上传
    this.subscription = observable.subscribe(observer);
    // subscription.unsubscribe(); // 上传取消
  };
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
  }
  // 取消上传
  remove = () => {
    // 上传取消
    this.props.onChange("");
  };
  render() {
    return (
      <div>
        <AntdUpload
          accept="video/mp4"
          className="my-upload"
          beforeUpload={this.beforeUpload}
          customRequest={this.customRequest}
          listType="picture"
          onRemove={this.remove}
        >
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        </AntdUpload>
      </div>
    );
  }
}
