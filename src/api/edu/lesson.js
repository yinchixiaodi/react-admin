// 获取某个章节对应的课时数据
import request from "@utils/request";

const BASE_URL = "/admin/edu/lesson";

// http://47.103.203.152/admin/edu/lesson/get/:chapterId
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}

// 批量删除多个课时
// http://47.103.203.152/admin/edu/lesson/batchRemove
export function reqBatchRemoveLessonList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList,
    },
  });
}
