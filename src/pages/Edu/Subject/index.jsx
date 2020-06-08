import React, { Component } from "react";
import { Button, Table, Pagination } from "antd";
import { PlusOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import "./index.less";
import { reqGetSubjectList } from "@api/edu/subject";
export default class Subject extends Component {
  state = {
    subjects: {
      total: 0,
      items: [],
    },
  };
  getSubjectList = async (page, limit) => {
    const result = await reqGetSubjectList(page, limit);
    this.setState({
      subjects: result,
    });
  };
  componentDidMount() {
    this.getSubjectList(1, 10);
  }
  handleChangePage = () => {};
  handleChangeShowSize = (current, size) => {
    // console.log(current, size);
    this.getSubjectList(current, size);
  };
  render() {
    const { subjects } = this.state;
    const columns = [
      { title: "分类名称", dataIndex: "title", key: "title" },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="danger">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    /* const data = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
    ]; */
    return (
      <div className="subject">
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
        <Table
          style={{ marginTop: 20 }}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={subjects.items} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            total: subjects.total,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["5", "10", "15", "20"],
            onChange: this.getSubjectList,
            onShowSizeChange: this.handleChangeShowSize,
          }}
        />
      </div>
    );
  }
}
