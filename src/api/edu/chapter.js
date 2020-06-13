// 获取某个课程对应的所有章节
import request from "@utils/request";

const BASE_URL = "/admin/edu/chapter";

// http://47.103.203.152/admin/edu/chapter/:page/:limit
// 当参数超过两个的时候，最好定义成对象
export function reqGetChapterList({ page, limit, courceId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courceId,
    },
  });
}

// 批量删除多个章节
// http://47.103.203.152/admin/edu/chapter/batchRemove
export function reqBatchRemoveChapterList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList,
    },
  });
}
