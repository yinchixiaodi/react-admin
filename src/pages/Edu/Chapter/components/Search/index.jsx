import React, { useEffect } from "react";
import { Form, Select, Button, message } from "antd";
import { connect } from "react-redux";
import { getAllCourseList, getChapterList } from "../../redux";
import "./index.less";
const { Option } = Select;
function Search({ getAllCourseList, allCourseList, getChapterList }) {
  useEffect(() => {
    getAllCourseList();
  }, [getAllCourseList]);
  // 点击查询课程章节执行的回调函数
  const finish = async ({ courseId }) => {
    // console.log(values);
    await getChapterList({ page: 1, limit: 10, courseId });
    message.success("查询课程章节成功");
  };
  return (
    <Form className="form-course" onFinish={finish} layout="inline">
      <Form.Item
        label="课程"
        name="courseId"
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
  { getAllCourseList, getChapterList }
)(Search);
