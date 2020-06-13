import React from "react";
import { Form, Button, PageHeader, Switch, Input, Card } from "antd";
import  Upload  from "@comps/Upload";
import "./index.less";

const { Option } = Form;
export default function AddLesson() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
  };
  // 提交表单的回调函数
  const onFinish = () => {};
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={<PageHeader onBack={() => null} title="新增课时" />}
        bordered={false}
      >
        <Form {...layout} onFinish={onFinish}>
          <Form.Item
            name="title"
            label="课时名称"
            rules={[{ required: true, message: "请输入课时名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="free"
            label="是否免费"
            rules={[{ required: true, message: "请选择是否免费" }]}
            valuePropName="checked"
          >
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              defaultChecked
            />
          </Form.Item>
          <Upload />
          <Form.Item>
            <Button type="primary" htmlType="submit" className="lesson-btn">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
