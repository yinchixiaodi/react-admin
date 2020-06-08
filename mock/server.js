const express = require("express");
const Mock = require("mockjs");
const app = express();

// 随机类
const Random = Mock.Random;

app.use((req, res, next) => {
  // 设置响应头
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "conten-type,token");
  res.set("Access-Control-Allow-Methods", "GET,POSE,PUT,DELETE");
  next();
});

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
