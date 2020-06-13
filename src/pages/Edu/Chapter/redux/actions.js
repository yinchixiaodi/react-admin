/*
同步action 
异步action
*/
import { reqGetAllCourseList } from "@api/edu/course";
import { reqGetChapterList, reqBatchRemoveChapterList } from "@api/edu/chapter";
import { reqGetLessonList, reqBatchRemoveLessonList } from "@api/edu/lesson";
import {
  ALL_COURSE_LIST,
  CHAPTER_LIST,
  LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST,
  BATCH_REMOVE_LESSON_LIST,
} from "./constants";

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

// 请求课程对应的章节数据
const getChapterListSync = (chapters) => ({
  type: CHAPTER_LIST,
  data: chapters,
});

export const getChapterList = ({ page, limit, courceId }) => {
  return (dispatch) => {
    return reqGetChapterList({ page, limit, courceId }).then((response) => {
      dispatch(getChapterListSync(response));
      return response;
    });
  };
};

// 请求所有章节对应的课时数据
const getLessonListSync = (data) => ({
  type: LESSON_LIST,
  data,
});

export const getLessonList = (chapterId) => {
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((response) => {
      dispatch(getLessonListSync({ chapterId, lessons: response }));
      return response;
    });
  };
};

// 请求批量删除多个章节
const batchRemoveChapterListSync = (idList) => ({
  type: BATCH_REMOVE_CHAPTER_LIST,
  data: idList,
});

export const batchRemoveChapterList = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveChapterList(idList).then((response) => {
      dispatch(batchRemoveChapterListSync(idList));
      return idList;
    });
  };
};

// 请求批量删除多个课时
const batchRemoveLessonListSync = (idList) => ({
  type: BATCH_REMOVE_LESSON_LIST,
  data: idList,
});

export const batchRemoveLessonList = (idList) => {
  return (dispatch) => {
    return reqBatchRemoveLessonList(idList).then((response) => {
      dispatch(batchRemoveLessonListSync(idList));
      return idList;
    });
  };
};
