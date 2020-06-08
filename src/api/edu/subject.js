import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
const MOCK_BASE_URL = `http://localhost:9527${BASE_URL}`;

// 获取一级分类列表
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${MOCK_BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
