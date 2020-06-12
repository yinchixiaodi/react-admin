import React, { useEffect } from "react";
import { Form, Select, Button } from "antd";
import { connect } from "react-redux";
import { getAllCourseList } from "../../redux";
import "./index.less";
const { Option } = Select;
function Search({ getAllCourseList, allCourseList }) {
  useEffect(() => {
    getAllCourseList();
  }, [getAllCourseList]);
  const finish = () => {};
  return (
    <Form className="form-course" onFinish={finish} layout="inline">
      <Form.Item
        label="课程"
        name="title"
        rules={[{ required: true, message: "请选择课程" }]}
      >
        <Select className="form-select" placeholder="请选择课程">
          {allCourseList.map((course) => {
            return (
              <Option value={course._id} key={course._id}>
                {course.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询课程章节
        </Button>
        <Button className="form-button">重置</Button>
      </Form.Item>
    </Form>
  );
}
export default connect(
  (state) => ({
    allCourseList: state.chapter.allCourseList,
  }),
  { getAllCourseList }
)(Search);
