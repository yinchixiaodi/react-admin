import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Tabs, Form, Input, Row, Col, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { login } from "@redux/actions/login";
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
function LoginForm({ login, history }) {
  const changeLogin = (key) => {
    console.log(key);
  };
  // 点击登录
  const finish = async (values) => {
    console.log(values);
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
  };
  return (
    <Form
      validateMessages={validateMessages}
      initialValues={{ rem: true }}
      onFinish={finish}
    >
      <div className="login-form-header">
        <Tabs defaultActiveKey="1" onChange={changeLogin}>
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
                      pattern: /^[0,9]{6}$/,
                      message: "请输入正确的验证码",
                    },
                  ]}
                >
                  <Input placeholder="验证码" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button>获取验证码</Button>
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
          <Button type="primary" className="login-form-btn" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Row justify="space-between">
          <Col>
            <Form.Item>
              <div className="otherLogin">
                <span>其他登录方式</span>
                <GithubOutlined />
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
export default withRouter(connect(null, { login })(LoginForm));
