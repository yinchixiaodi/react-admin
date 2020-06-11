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

// 获取二级分类列表
export function reqGetSubSubjectList(parentId) {
  return request({
    url: `${MOCK_BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}

// 添加课程分类
// http://47.103.203.152/admin/edu/subject/save
export function reqAddSubject(title, parentId) {
  return request({
    url: `${MOCK_BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId,
    },
  });
}
