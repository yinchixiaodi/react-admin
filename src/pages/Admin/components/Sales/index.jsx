import React, { Component } from "react";
import { Card, Button, DatePicker } from "antd";
import { ColumnChart } from "bizcharts";
import moment from "moment";

const { RangePicker } = DatePicker;
const tabList = [
  {
    key: "sales",
    tab: "销售量",
  },
  {
    key: "visits",
    tab: "访问量",
  },
];

const data = [
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

const contentList = {
  sales: (
    <div className="saleChart">
      <div className="saleChart-left">
        <ColumnChart
          data={data}
          title={{
            visible: true,
            text: "销售业绩",
          }}
          forceFit
          padding="auto"
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
        />
      </div>
    </div>
  ),
  visits: <p>visits content</p>,
};

// 定制日期格式化
const dateFormat = "YYYY-MM-DD";
export default class Sales extends Component {
  state = {
    tabkey: "sales",
    dateValue: "day",
    rangeTime: [
      moment(moment().format(dateFormat), dateFormat),
      moment(moment().format(dateFormat), dateFormat),
    ],
  };
  // tab切换时调用的回调函数
  tabChange = (tabkey) => {
    console.log(tabkey);
    this.setState({ tabkey });
  };
  // 切换年月日显示
  changeDateValue = (dateValue) => {
    return () => {
      //   console.log(dateValue); // week month year
      const time = moment(moment().format(dateFormat), dateFormat);
      let rangeTime = null;
      switch (dateValue) {
        case "year":
          rangeTime = [
            time,
            moment(moment().add(1, "y").format(dateFormat), dateFormat),
          ];
          break;
        case "mouth":
          rangeTime = [
            time,
            moment(moment().add(1, "M").format(dateFormat), dateFormat),
          ];
          break;
        case "week":
          rangeTime = [
            time,
            moment(moment().add(7, "d").format(dateFormat), dateFormat),
          ];
          break;
        default:
          rangeTime = [time, time];
      }
      this.setState({
        dateValue,
        rangeTime,
      });
    };
  };
  // 切换日期显示
  rangeTimeChage = (date) => {
    // console.log(date);
    this.setState({
      rangeTime: date,
    });
  };
  render() {
    const { tabkey, dateValue, rangeTime } = this.state;
    const extra = (
      <div>
        <Button
          type={dateValue === "day" ? "link" : "text"}
          onClick={this.changeDateValue("day")}
        >
          本日
        </Button>
        <Button
          type={dateValue === "week" ? "link" : "text"}
          onClick={this.changeDateValue("week")}
        >
          本周
        </Button>
        <Button
          type={dateValue === "mouth" ? "link" : "text"}
          onClick={this.changeDateValue("mouth")}
        >
          本月
        </Button>
        <Button
          type={dateValue === "year" ? "link" : "text"}
          onClick={this.changeDateValue("year")}
        >
          本年
        </Button>
        <RangePicker value={rangeTime} onChange={this.rangeTimeChage} />
      </div>
    );
    return (
      <Card
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={tabkey}
        tabBarExtraContent={extra}
        onTabChange={this.tabChange}
      >
        {contentList[tabkey]}
      </Card>
    );
  }
}
