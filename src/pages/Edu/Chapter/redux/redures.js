import { ALL_COURSE_LIST, CHAPTER_LIST, LESSON_LIST } from "./constants";

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
    default:
      return prevState;
  }
}
