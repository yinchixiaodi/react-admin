/* 
同步action返回action对象
异步action返回函数
*/
import { reqGetSubjectList, reqGetSubSubjectList } from "@api/edu/subject";
import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST } from "./constants";
const getSubjectListSync = (subjectList) => ({
  type: GET_SUBJECT_LIST,
  data: subjectList,
});
// 异步获取一级分类列表的数据
export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.items;
    });
  };
};

const getSubSubjectListSync = (data) => ({
  type: GET_SUB_SUBJECT_LIST,
  data,
});
// 异步获取二级分类列表的数据
export const getSubSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSubSubjectList(parentId).then((response) => {
      dispatch(
        getSubSubjectListSync({ parentId, subSubjectList: response.items })
      );
      return response;
    });
  };
};
