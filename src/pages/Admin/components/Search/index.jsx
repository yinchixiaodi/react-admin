import React, { Component } from "react";
import { Card, Button, Radio } from "antd";
import { DonutChart } from "bizcharts";

const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其它",
    value: 5,
  },
];

export default class Search extends Component {
  state = {
    radioValue: "all",
  };
  handleChange = (event) => {
    console.log(event);
  };
  render() {
    const { radioValue } = this.state;
    const extra = (
      <Radio.Group value={radioValue} onChange={this.handleChange}>
        <Radio.Button value="all">全部渠道</Radio.Button>
        <Radio.Button value="line">线上</Radio.Button>
        <Radio.Button value="shop">门店</Radio.Button>
      </Radio.Group>
    );
    return (
      <Card title="销售额类别占比" extra={extra} style={{ width: "49%" }}>
        <DonutChart
          data={data}
          forceFit
          radius={0.8}
          padding="auto"
          angleField="value"
          colorField="type"
          statistic={{
            visible: true,
            totalLabel: "销售额",
          }}
        />
      </Card>
    );
  }
}
