import request from "@utils/request";

const BASE_URL = "/admin/edu/course";

// 获取所有课程分类列表
// http://47.103.203.152/admin/edu/course
export function reqGetAllCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}

// 获取课程分页列表
// http://47.103.203.152/admin/edu/course/:page/:limit
export function reqGetCourseList({
  page,
  limit,
  teacherId,
  subjectId,
  subjectParentId,
  title,
}) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      teacherId,
      subjectId,
      subjectParentId,
      title,
    },
  });
}
