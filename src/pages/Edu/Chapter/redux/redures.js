import {
  ALL_COURSE_LIST,
  CHAPTER_LIST,
  LESSON_LIST,
  BATCH_REMOVE_CHAPTER_LIST,
  BATCH_REMOVE_LESSON_LIST,
} from "./constants";

const initChaper = {
  allCourseList: [],
  chapters: {
    total: 0,
    items: [],
  },
};

export default function chapter(prevState = initChaper, action) {
  switch (action.type) {
    case ALL_COURSE_LIST:
      return {
        ...prevState,
        allCourseList: action.data,
      };
    case CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: action.data.total,
          items: action.data.items.map((item) => {
            return {
              ...item,
              children: [],
            };
          }),
        },
      };
    case LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((item) => {
            if (item._id === action.data.chapterId) {
              return {
                ...item,
                children: action.data.lessons,
              };
            }
            return item;
          }),
        },
      };
    case BATCH_REMOVE_CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((item) => {
            if (item._id === action.data.chapterId) {
              return {
                ...item,
                children: action.data.lessons,
              };
            }
            return item;
          }),
        },
      };
    case BATCH_REMOVE_LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((item) => {
            // 找到要更新的课时数据
            let children = item.children;
            if (children && children.length) {
              // 过滤掉已经选中的
              children = children.filter((child) => {
                return action.data.indexOf(child._id) === -1;
              });
            }
            return {
              ...item,
              children,
            };
          }),
        },
      };
    default:
      return prevState;
  }
}
