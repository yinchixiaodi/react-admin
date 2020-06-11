const express = require("express");
const Mock = require("mockjs");
const app = express();

// 随机类
const Random = Mock.Random;

// 使用解析POST和PUT请求的请求体参数的中间件
app.use(express.json());

app.use((req, res, next) => {
  // 设置响应头
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "conten-type,token");
  res.set("Access-Control-Allow-Methods", "GET,POSE,PUT,DELETE");
  next();
});
// 添加分类数据
app.post("/admin/edu/subject/save", (req, res) => {
  const { title, parentId } = req.body;
  res.json({
    code: 20000,
    success: true,
    data: {
      _id: Date.now(),
      title,
      parentId,
    },
    message: "",
  });
});
// 二级分类数据
app.get("/admin/edu/subject/get/:parentId", (req, res) => {
  const { parentId } = req.params;
  const total = Random.integer(1, 5);
  const data = Mock.mock({
    total,
    [`items|${total}`]: [
      {
        "_id|+1": 100,
        title: "@ctitle(2,5)",
        parentId,
      },
    ],
  });
  if (total === 1) {
    data.items = [data.items];
  }
  res.json({
    code: 20000,
    success: true,
    data,
    message: "",
  });
});
// 一级分类数据
app.get("/admin/edu/subject/:page/:limit", (req, res) => {
  const { page, limit } = req.params;
  const data = Mock.mock({
    total: Random.integer(+limit + 1, limit * 2),
    [`items|${limit}`]: [
      {
        "_id|+1": 1,
        title: "@ctitle(2,5)",
        parentId: 0,
      },
    ],
  });
  res.json({
    code: 20000,
    success: true,
    data,
    message: "",
  });
});

app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("请求出错：", err);
  }
  console.log("服务已经启动，端口9527正在监听中...");
});
