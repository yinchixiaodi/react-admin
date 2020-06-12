import React, { Component } from "react";
import { Tooltip, Button, Alert, Table } from "antd";
import "./index.less";
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
export default class List extends Component {
  render() {
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
          columns={[]}
          expandable={
            {
              // 有children属性才会有展开图标
            }
          }
          dataSource={[]} // 决定每一行显示的数据
          rowKey="_id"
          pagination={{
            // current,
            // pageSize,
            // total: subjectList.total,
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
