import React, { Component } from "react";
import { Button, Table, Pagination } from "antd";
import { connect } from "react-redux";
import { PlusOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import "./index.less";
import { getSubjectList, getSubSubjectList } from "./redux";
@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList, getSubSubjectList }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [],
  };
  componentDidMount() {
    this.props.getSubjectList(1, 10);
  }
  handleChangeShowSize = (current, size) => {
    // console.log(current, size);
    this.props.getSubjectList(current, size);
  };
  handleExpand = (expanded, record) => {
    if (!expanded) return;
    this.props.getSubSubjectList(record._id);
  };
  handleExpandedRowsChange = (expandedRowKeys) => {
    console.log(expandedRowKeys);
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      this.props.getSubSubjectList(lastKey);
    }
    // 更新状态里面的数据
    this.setState({
      expandedRowKeys,
    });
  };
  render() {
    const { expandedRowKeys } = this.props;
    const { subjectList, getSubjectList } = this.props;
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
            expandedRowKeys,
            onExpandedRowsChange: this.handleExpandedRowsChange,
            // 决定行展开时显示什么样的内容
            /* expandedRowRender: (record) => {
              const children = record.children ? record.children : [];
              // console.log(children); 当二级菜单里面只有一个值的时候返回的是一个对象不是一个数组
              return children.map((subSubject) => {
                return (
                  <div key={subSubject._id} className="sub-subject">
                    <div>{subSubject.title}</div>
                    <div className="sub-subject-right">
                      <Button type="primary">
                        <FormOutlined />
                      </Button>
                      <Button type="danger">
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                );
              });
            }, */
            // onExpand: this.handleExpand,
          }}
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            total: subjectList.total,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["5", "10", "15", "20"],
            onChange: getSubjectList,
            onShowSizeChange: this.handleChangeShowSize,
          }}
        />
      </div>
    );
  }
}
export default Subject;
