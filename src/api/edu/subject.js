import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";
// const MOCK_BASE_URL = `http://localhost:9527${BASE_URL}`;

// 获取一级分类列表
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

// 获取二级分类列表
export function reqGetSubSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}

// 添加课程分类
// http://47.103.203.152/admin/edu/subject/save
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId,
    },
  });
}

// 修改课程分类
// http://47.103.203.152/admin/edu/subject/update
export function reqUpdateSubject(title, id) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      title,
      id,
    },
  });
}

// 删除课程分类
// http://47.103.203.152/admin/edu/subject/remove/:id
export function reqRemoveSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
