import React from "react";
import { Form, Button, PageHeader, Switch, Input, Card, message } from "antd";
import Upload from "@comps/Upload";
import { reqAddLesson } from "@api/edu/lesson";
import "./index.less";

const { Option } = Form;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
export default function AddLesson({ location, history }) {
  // 提交表单的回调函数
  const onFinish = async (values) => {
    const chapterId = location.state._id;
    await reqAddLesson({ chapterId, ...values });
    message.success("添加课时成功");
    history.push("/edu/chapter/list");
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={<PageHeader onBack={() => null} title="新增课时" />}
        bordered={false}
      >
        <Form {...layout} onFinish={onFinish} initialValues={{ free: true }}>
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
          <Form.Item
            name="video"
            rules={[{ required: true, message: "请上传视频" }]}
          >
            <Upload />
          </Form.Item>
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
