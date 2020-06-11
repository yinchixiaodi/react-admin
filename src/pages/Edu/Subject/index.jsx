import React, { Component } from "react";
import { Button, Table, Tooltip, Input, message, Modal } from "antd";
import { connect } from "react-redux";
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getSubjectList, getSubSubjectList, getUpdateSubject } from "./redux";
import { reqRemoveSubject } from "@api/edu/subject";
import "./index.less";
@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList, getSubSubjectList, getUpdateSubject }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [],
    subjectId: "",
    subjectTitle: "",
    undateSubjectTitle: "",
    current: 1,
    pageSize: 10,
  };

  componentDidMount() {
    this.getSubjectList(1, 10);
  }
  getSubjectList = (page, limit) => {
    this.setState({
      current: page,
      pageSize: limit,
    });
    return this.props.getSubjectList(page, limit);
  };
  handleChangeShowSize = (current, size) => {
    // console.log(current, size);
    // 每次更改每页显示的条数的时候，都显示第一页的数据
    this.getSubjectList(1, size);
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
  addSubject = () => {
    this.props.history.push("/edu/subject/add");
  };
  // 点击要修改课程分类名称的回调函数
  updateSubject = (subject) => {
    return () => {
      // console.log(subject)
      if (this.state.subjectId) {
        message.warn("请更新/取消更新之前要更新的数据");
        return;
      }
      // console.log(subject);
      this.setState({
        subjectId: subject._id,
        subjectTitle: subject.title,
      });
      // console.log(this.state.subjectTitle);
    };
  };
  // 收集修改的课程名称的数据
  handleChangeTitle = (event) => {
    this.setState({
      undateSubjectTitle: event.target.value,
    });
  };
  // 修改之后点击确认
  handleUpdateSubject = async () => {
    const { subjectId, undateSubjectTitle, subjectTitle } = this.state;
    console.log(subjectId, undateSubjectTitle, subjectTitle);
    // 如果输入的值为空，提示
    if (!undateSubjectTitle) {
      // console.log(undateSubjectTitle);
      message.warn("标题不能为空");
      return;
    }
    // 如果修改之后和修改之前的值相同，提示
    if (undateSubjectTitle === subjectTitle) {
      // console.log(undateSubjectTitle, subjectTitle);
      message.warn("不能和之前的值相同");
      return;
    }
    // 发送请求
    await this.props.getUpdateSubject(undateSubjectTitle, subjectId);
    message.success("更新课程分类成功");
    // 成功之后，显示文本
    this.cancel();
  };
  // 删除课程分类
  removeSubject = (subject) => {
    return () => {
      Modal.confirm({
        title: (
          <p>
            你确定要删除 <span className="del-subject">{subject.title}</span>{" "}
            课程分类吗?
          </p>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          await reqRemoveSubject(subject._id);
          message.success("删除成功");
          // 重新请求列表数据
          const { current, pageSize } = this.state;

          // 如果当前不是在第一页，并且这一页只有一条数据，且是一级分类
          if (
            current > 1 &&
            this.props.subjectList.items.length === 1 &&
            subject.parentId === "0"
          ) {
            this.getSubjectList(current - 1, pageSize);
            return;
          }
          this.getSubjectList(current, pageSize);
        },
      });
    };
  };
  // 取消修改
  cancel = () => {
    this.setState({
      subjectId: "",
      subjectTitle: "",
    });
  };
  render() {
    const { expandedRowKeys, current, pageSize } = this.state;
    const { subjectList, getSubjectList } = this.props;
    const columns = [
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "title",
        render: (subject) => {
          // console.log(subject);
          const { subjectId } = this.state;
          // console.log(subject._id, subjectId);
          if (subject._id === subjectId) {
            return (
              <Input
                className="update-subject"
                defaultValue={subject.title}
                onChange={this.handleChangeTitle}
              />
            );
          }
          return <span>{subject.title}</span>;
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: (subject) => {
          // console.log(subject);
          if (subject._id === this.state.subjectId) {
            return (
              <>
                <Button type="primary" onClick={this.handleUpdateSubject}>
                  确认
                </Button>
                <Button onClick={this.cancel}>取消</Button>
              </>
            );
          }
          return (
            <>
              <Tooltip title="更新课程分类">
                <Button type="primary" onClick={this.updateSubject(subject)}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课程分类">
                <Button type="danger" onClick={this.removeSubject(subject)}>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];
    return (
      <div className="subject">
        <Button type="primary" onClick={this.addSubject}>
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
            current,
            pageSize,
            total: subjectList.total,
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
export default Subject;
