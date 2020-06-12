import React, { Component } from "react";
import { Tooltip, Button, Alert, Table } from "antd";
import { connect } from "react-redux";
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./index.less";
import { getLessonList } from "../../redux";

@connect((state) => ({ chapters: state.chapter.chapters }), { getLessonList })
class List extends Component {
  state = {
    expandedRowKeys: [],
  };
  handleExpandedRowsChange = (expandedRowKeys) => {
    // 每次展开并请求数据的是 expandedRowKeys 数组的最后一个
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      // 请求获取课时数据
      this.props.getLessonList(lastKey);
    }
    this.setState({
      expandedRowKeys,
    });
  };
  render() {
    const { chapters } = this.props;
    const { expandedRowKeys } = this.state;
    const columns = [
      {
        title: "名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        key: "free",
        render: (free) => {
          return free === undefined ? "" : free ? "是" : "否";
        },
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        render: (data) => {
          return (
            <>
              {"free" in data ? null : (
                <Tooltip title="增加课时">
                  <Button type="primary">
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="修改章节">
                <Button type="primary">
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除章节">
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];
    return (
      <div className="list">
        <div className="table-header">
          <h5>课程章节列表</h5>
          <div className="table-header-right">
            <Button type="primary">
              <PlusOutlined />
              新增
            </Button>
            <Button type="danger">批量删除</Button>
            <Tooltip title="全屏">
              <FullscreenOutlined />
            </Tooltip>
            <Tooltip title="刷新">
              <ReloadOutlined />
            </Tooltip>
            <Tooltip title="设置">
              <SettingOutlined />
            </Tooltip>
          </div>
        </div>
        <Alert message="已选择 0 项" type="info" showIcon />
        <Table
          style={{ marginTop: 20 }}
          columns={columns} // 决定列头
          expandable={{
            // 有children属性才会有展开图标
            expandedRowKeys,
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={chapters.items} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            // current,
            // pageSize,
            total: chapters.total,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: ["5", "10", "15", "20"],
            // onChange: this.getSubjectList,
            // onShowSizeChange: this.handleChangeShowSize,
          }}
        />
      </div>
    );
  }
}
export default List;
