import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button } from "antd";
import { connect } from "react-redux";
import { reqGetAllTeacherList } from "@api/edu/teacher";
import { reqGetAllSubjectList, reqGetSubSubjectList } from "@api/edu/subject";
import { getCourseList } from "../../redux";
import "./index.less";

const { Option } = Select;

function Search({ getCourseList, getSearchFormData }) {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  /* useEffect(() => {
    const fetchData = async () => {
      // 请求所有讲师的数据，请求所有一级课程分类的数据
      const [teachers, subjects] = await Promise.all([
        reqGetAllTeacherList(),
        reqGetAllSubjectList(),
      ]);
      setTeachers(teachers);
      setSubjects(subjects);
    };
    fetchData();
  }); */
  useEffect(() => {
    const fetchData = async () => {
      const [teachers, subjects] = await Promise.all([
        // 请求所有讲师数据
        reqGetAllTeacherList(),
        // 请求所有一级分类数据
        reqGetAllSubjectList(),
      ]);
      setTeachers(teachers);
      // subjects数据展示需要处理
      const data = subjects.map((subject) => {
        return {
          value: subject._id, // 选中的值
          label: subject.title, // 显示名称
          isLeaf: false,
        };
      });
      setSubjects(data);
    };
    fetchData();
  }, []);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  // 点击一级菜单调用的函数 点击加载二级菜单
  const loadData = async (selectedOptions) => {
    console.log(selectedOptions);
    // targetOption 代表要显示的二级菜单的一级菜单
    const targetOption = selectedOptions[selectedOptions.length - 1];
    console.log(targetOption);
    targetOption.loading = true;
    // 加载二级菜单的数据
    const { items } = await reqGetSubSubjectList(targetOption.value);
    // console.log(items); // _id title
    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      if (items.length) {
        targetOption.children = items.map((item) => {
          return {
            value: item._id,
            label: item.title,
          };
        });
      } else {
        targetOption.isLeaf = true;
      }

      setSubjects([...subjects]);
    }, 1000);
  };

  const resetForm = () => {
    form.resetFields();
  };
  // 提交表单
  const finish = async (values) => {
    console.log(values);
    // 发送请求
    const { subject = [], teacherId, title } = values;
    let subjectId, subjectParentId;
    if (subject.length === 1) {
      subjectParentId = "0";
      subjectId = subject[0];
    } else if (subject.length === 2) {
      subjectParentId = subject[0];
      subjectId = subject[1];
    }
    await getCourseList({
      page: 1,
      limit: 10,
      teacherId,
      subjectId,
      subjectParentId,
      title,
    });
    // 调用父组件传递的方法，修改父组件的数据
    getSearchFormData({ teacherId, title, subjectId, subjectParentId });
    // message.success("获取课程分页数据成功");
  };
  return (
    <Form layout="inline" form={form} onFinish={finish}>
      <Form.Item name="title" label="标题">
        <Input placeholder="课程标题" style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name="teacherId" label="讲师">
        {/* <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map((teacher) => {
            return (
              <Option value={teacher._id} key={teacher._id}>
                {teacher.name}
              </Option>
            );
          })}
        </Select> */}
        <Select
          allowClear
          placeholder="课程讲师"
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map((teacher) => {
            return (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label="分类">
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjects}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder="课程分类"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(Search);
