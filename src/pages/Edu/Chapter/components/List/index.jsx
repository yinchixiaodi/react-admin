import React, { Component } from "react";
import { Tooltip, Button, Alert, Table, message, Modal } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import screenfull from "screenfull";
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Player from "griffith";
import {
  getLessonList,
  batchRemoveLessonList,
  batchRemoveChapterList,
} from "../../redux";
import "./index.less";

// withRouter的作用是给非路由组件传递路由组件的三大属性
@withRouter
@connect((state) => ({ chapters: state.chapter.chapters }), {
  getLessonList,
  batchRemoveLessonList,
  batchRemoveChapterList,
})
class List extends Component {
  state = {
    expandedRowKeys: [],
    selectedRowKeys: [],
    lesson: {},
    visible: false,
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
  // 点击添加课时数据
  handleAddLesson = (chapter) => {
    // console.log(chapter);
    return () => {
      this.props.history.push("/edu/chapter/addlesson", chapter);
    };
  };
  // 获取已经选中的章节/课时的id列表
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  // 批量删除选中的章节或者课时
  batchRemoveChapter = async () => {
    // 分别将章节id和课时id存起来
    const { selectedRowKeys } = this.state;
    console.log(selectedRowKeys); // 所有选中的id
    const {
      // 将 chapters 进行解构赋值，获取到items，然后将items重命名
      chapters: { items: chapters },
      batchRemoveChapterList,
      batchRemoveLessonList,
    } = this.props;
    // 遍历每一个元素，看其_id是否匹配上selectedRowKeys里面的某项值，如果匹配上说明要删除
    const ids = Array.from(selectedRowKeys); // 剩下的就是课时id
    console.log(ids); // 所有选中的课时id
    // 章节id列表
    const chaptersId = [];
    chapters.forEach((chapter) => {
      const index = ids.indexOf(chapter._id);
      if (index > -1) {
        // 说明是章节id
        // 删除index对应的元素
        const [id] = ids.splice(index, 1);
        chaptersId.push(id);
      }
    });
    console.log(chaptersId);
    // console.log(ids);
    await batchRemoveChapterList(chaptersId);
    await batchRemoveLessonList(ids);
    message.success("批量删除课时成功");
  };
  // 点击全屏显示
  screenfull = () => {
    const dom = this.props.screenfullRef.current;
    screenfull.toggle(dom);
  };
  // 点击显示视频
  showVideoModal = (lesson) => {
    return () => {
      this.setState({
        visible: true,
        lesson,
      });
    };
  };
  // 点击隐藏Modal
  handleCancel = () => {
    this.setState({
      visible: false,
      lesson: {},
    });
  };
  render() {
    const { chapters } = this.props;
    const { expandedRowKeys, selectedRowKeys, lesson, visible } = this.state;
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
        title: "视频",
        key: "video",
        render: (lesson) => {
          return (
            "video" in lesson && (
              <Tooltip title="预览视频">
                <Button onClick={this.showVideoModal(lesson)}>
                  <EyeOutlined />
                </Button>
              </Tooltip>
            )
          );
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
                  <Button type="primary" onClick={this.handleAddLesson(data)}>
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
              新增章节
            </Button>
            <Button type="danger" onClick={this.batchRemoveChapter}>
              批量删除
            </Button>
            <Tooltip title="全屏">
              <FullscreenOutlined onClick={this.screenfull} />
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
          // 批量删除
          rowSelection={{
            selectedRowKeys,
            onChange: this.onSelectChange,
          }}
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
        <Modal
          title={lesson.title}
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
          centered={true}
        >
          <Player
            sources={{
              hd: {
                play_url: lesson.video,
              },
            }}
          />
        </Modal>
      </div>
    );
  }
}
export default List;
