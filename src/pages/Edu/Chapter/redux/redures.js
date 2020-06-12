import { ALL_COURSE_LIST } from "./constants";

const initChaper = {
  allCourseList: [],
};

export default function chapter(prevState = initChaper, action) {
  switch (action.type) {
    case ALL_COURSE_LIST:
      return {
        ...prevState,
        allCourseList: action.data,
      };
    default:
      return prevState;
  }
}
