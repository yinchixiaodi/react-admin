import { reqGetCourseList } from "@api/edu/course";
import { GET_COURSE_LIST } from "./constants";

// 获取分页课程数据

const getCourseListSync = (courseList) => {
  return {
    type: GET_COURSE_LIST,
    data: courseList,
  };
};

export const getCourseList = ({
  page,
  limit,
  teacherId,
  subjectId,
  subjectParentId,
  title,
}) => {
  return (dispatch) => {
    return reqGetCourseList({
      page,
      limit,
      teacherId,
      subjectId,
      subjectParentId,
      title,
    }).then((response) => {
      dispatch(getCourseListSync(response));
      return response;
    });
  };
};
