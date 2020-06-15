import React from "react";
import { Row, Col, Progress } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { AreaChart, ColumnChart } from "bizcharts";
import Card from "@comps/Card";
import "./index.less";
const layout = { xs: 24, sm: 12, md: 12, lg: 6 };
// 数据源
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 9 },
  { year: "1993", value: 1 },
  { year: "1994", value: 5 },
  { year: "1995", value: 2 },
  { year: "1996", value: 6 },
  { year: "1997", value: 3 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];
const data1 = [
  {
    type: "家具家电",
    sales: 38,
  },
  {
    type: "粮油副食",
    sales: 52,
  },
  {
    type: "生鲜水果",
    sales: 61,
  },
  {
    type: "美容洗护",
    sales: 145,
  },
  {
    type: "母婴用品",
    sales: 48,
  },
  {
    type: "进口食品",
    sales: 38,
  },
  {
    type: "食品饮料",
    sales: 38,
  },
  {
    type: "家庭清洁",
    sales: 38,
  },
];

export default function Visits() {
  return (
    <Row gutter={16}>
      <Col {...layout}>
        <Card
          title="总销售额"
          number="￥112893"
          content={
            <>
              <span>
                周同比 12% <CaretUpOutlined style={{ color: "red" }} />
              </span>
              &nbsp;
              <span>
                日同比 10% <CaretDownOutlined style={{ color: "green" }} />
              </span>
            </>
          }
          footer="日销售额 ￥12893"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="访问量"
          number="112893"
          content={
            <div className="card-content-bizcharts">
              <AreaChart
                data={data}
                xField="year"
                yField="value"
                forceFit // 自适应宽高
                xAxis={{ visible: false }} // 隐藏x轴
                yAxis={{ visible: false }} // 隐藏y轴
                smooth
                meta={{
                  year: {
                    alias: "年份",
                  },
                  value: {
                    alias: "数量",
                  },
                }}
              />
            </div>
          }
          footer="日销售额 ￥12893"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="支付笔数"
          number="112893"
          content={
            <ColumnChart
              data={data1}
              forceFit
              padding="0"
              xField="type"
              yField="sales"
              meta={{
                type: {
                  alias: "类别",
                },
                sales: {
                  alias: "销售额(万)",
                },
              }}
              xAxis={{ visible: false }}
              yAxis={{ visible: false }}
            />
          }
          footer="转化率60%"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="运营结果"
          number="112893"
          content={
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={72.9}
            />
          }
          footer={
            <>
              <span>
                周同比 12% <CaretUpOutlined style={{ color: "red" }} />
              </span>
              &nbsp;
              <span>
                日同比 10% <CaretDownOutlined style={{ color: "green" }} />
              </span>
            </>
          }
        />
      </Col>
    </Row>
  );
}
