// 获取某个章节对应的课时数据
import request from "@utils/request";

export function reqGetToken() {
  return request({
    url: "/uploadtoken",
    method: "GET",
  });
}
