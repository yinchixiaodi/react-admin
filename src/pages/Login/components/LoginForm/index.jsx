import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Tabs, Form, Input, Row, Col, Button, Checkbox, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { login, mobileLogin } from "@redux/actions/login";
import { reqSendCode } from "@api/acl/oauth";
import { CLIENT_ID } from "@conf/oauth";
import "./index.less";

const { TabPane } = Tabs;
const rules = [
  { required: true },
  {
    max: 15,
    message: "输入的长度不能大于15位",
  },
  {
    min: 5,
    message: "输入的长度不能小于5位",
  },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "只能输入字母、数字和下划线",
  },
];
// 公共校验
const validateMessages = {
  required: "请输入${name}!",
};
// 定义重新发送验证码的时间
const TIME = 60;
let countingDownTime = TIME;
function LoginForm({ login, mobileLogin, history }) {
  const [form] = Form.useForm();
  const [, setCountingDownTime] = useState(0);
  const [isSendCode, setIsSendCode] = useState(false);
  const [activeKey, setActiveKey] = useState("user");
  const changeLogin = (key) => {
    setActiveKey(key);
  };
  // 点击登录
  const finish = async () => {
    if (activeKey === "user") {
      form
        .validateFields(["username", "password", "rem"])
        .then(async (values) => {
          const { username, password, rem } = values;
          // 发送请求
          const token = await login(username, password);
          // 请求成功
          // 保存token
          if (rem) {
            localStorage.setItem("user_token", token);
          }
          // 跳转到首页
          history.replace("/");
        });
      return;
    }
    form.validateFields(["mobile", "code", "rem"]).then(async (values) => {
      const { mobile, code, rem } = values;
      // 发送请求
      const token = await mobileLogin(mobile, code);
      // 请求成功
      // 保存token
      if (rem) {
        localStorage.setItem("user_token", token);
      }
      // 跳转到首页
      history.replace("/");
    });
  };
  // 定义重新获取验证码倒计时的方法
  const countingDown = () => {
    // 设置循环定时器
    const timer = setInterval(() => {
      countingDownTime--;
      //   console.log(countingDownTime);
      if (countingDownTime <= 0) {
        // 清除定时器
        clearInterval(timer);
        // 将 countingDownTime 的值置为60
        countingDownTime = TIME;
        // 更新按钮的状态
        setIsSendCode(false);
        return;
      }
      setCountingDownTime(countingDownTime);
    }, 1000);
  };
  // 获取验证码
  const getCode = () => {
    form
      .validateFields(["mobile"])
      .then(async ({ mobile }) => {
        console.log(mobile); // 输入的手机号
        // 获取到手机号之后发送请求
        await reqSendCode(mobile);
        // 发送请求成功之后应该修改按钮的显示状态
        setIsSendCode(true);
        countingDown();
        message.success("发送验证码成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 第三方登录-Github
  const goGithub = () => {
    console.log(window.location);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
  };
  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      initialValues={{ rem: true }}
      // onFinish={finish}
    >
      <div className="login-form-header">
        <Tabs activeKey={activeKey} onChange={changeLogin}>
          <TabPane tab="账户密码登陆" key="user">
            <Form.Item name="username" rules={rules}>
              <Input prefix={<UserOutlined />} className="form-input" />
            </Form.Item>
            <Form.Item name="password" rules={rules}>
              <Input
                prefix={<LockOutlined />}
                type="password"
                className="form-input"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登陆" key="mobile">
            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "请输入手机号" },
                {
                  pattern: /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/,
                  message: "请输入正确的手机号",
                },
              ]}
            >
              <Input prefix={<MobileOutlined />} placeholder="手机号" />
            </Form.Item>
            <Row justify="space-between">
              <Col>
                <Form.Item
                  name="code"
                  rules={[
                    { required: true, message: "请输入验证码" },
                    {
                      pattern: /^[0-9]{6}$/,
                      message: "请输入正确的验证码",
                    },
                  ]}
                >
                  <Input placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button onClick={getCode} disabled={isSendCode}>
                    {isSendCode
                      ? `${countingDownTime}秒后可重发`
                      : "获取验证码"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify="space-between">
          <Col>
            <Form.Item name="rem" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="link">忘记密码</Button>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" className="login-form-btn" onClick={finish}>
            登录
          </Button>
        </Form.Item>
        <Row justify="space-between">
          <Col>
            <Form.Item>
              <div className="otherLogin">
                <span>其他登录方式</span>
                <GithubOutlined onClick={goGithub} />
                <QqOutlined />
                <WechatOutlined />
              </div>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="link">注册</Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
export default withRouter(connect(null, { login, mobileLogin })(LoginForm));
