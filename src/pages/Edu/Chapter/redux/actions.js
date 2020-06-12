/*
同步action 
异步action
*/
import { reqGetAllCourseList } from "@api/edu/course";
import { ALL_COURSE_LIST } from "./constants";
// 请求所有课程数据

const getAllCourseListSync = (courseList) => ({
  type: ALL_COURSE_LIST,
  data: courseList,
});

export const getAllCourseList = () => {
  return (dispatch) => {
    return reqGetAllCourseList().then((response) => {
      dispatch(getAllCourseListSync(response));
      return response;
    });
  };
};
