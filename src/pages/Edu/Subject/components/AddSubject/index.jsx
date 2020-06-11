import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { Link } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList } from "../../redux";
import { reqAddSubject } from "@api/edu/subject";
import "./index.css";
const { Option } = Select;
let page = 1;
function AddSubject({ total, getSubjectList, history }) {
  const [subjects, setSubjects] = useState([]);
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
  };
  useEffect(() => {
    // 相当于compontentDidMount
    // 每次点击增加的时候后将page置为1
    page = 1;
    const fetchData = async () => {
      const items = await getSubjectList(page++, 10);
      // console.log(items);
      setSubjects(items);
    };
    fetchData();
  }, [getSubjectList]);
  const loadMore = async () => {
    const items = await getSubjectList(page++, 10);
    setSubjects([...subjects, ...items]);
  };
  // 提交表单
  const onFinish = async (values) => {
    // 发送请求
    const { title, parentId } = values;
    await reqAddSubject(title, parentId);
    // 请求成功提示
    message.success("添加课程分类数据成功");
    // 返回课程分类界面
    history.push("/edu/subject/list");
  };
  return (
    <div className="site-card-border-less-wrapper">
      <Card
        title={
          <>
            <Link to="/edu/subject/list">
              <ArrowLeftOutlined />
            </Link>
            <span className="title">添加课程分类</span>
          </>
        }
        bordered={false}
      >
        <Form {...layout} onFinish={onFinish}>
          <Form.Item
            name="title"
            label="课程分类名称"
            rules={[{ required: true, message: "请输入课程分类名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parentId"
            label="父级分类"
            rules={[{ required: true, message: "请选择父级分类" }]}
          >
            <Select
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  {subjects.length >= total ? (
                    "没有更多数据了!"
                  ) : (
                    <Button type="link" onClick={loadMore}>
                      加载更多数据~
                    </Button>
                  )}
                </div>
              )}
            >
              <Option value="0" key={0}>
                一级分类
              </Option>
              {subjects.map((subject, index) => {
                return (
                  <Option value={subject._id} key={index + 1}>
                    {subject.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default connect((state) => ({ total: state.subjectList.total }), {
  getSubjectList,
})(AddSubject);
