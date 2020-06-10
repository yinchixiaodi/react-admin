import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST } from "./constants";

const initSubjectList = {
  total: 0,
  items: [],
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      return {
        total: action.data.total,
        items: action.data.items.map((subject) => {
          return {
            ...subject,
            children: [],
          };
        }),
      };
    // 如果获取的是二级分类的数据，给每个一级分类增加一个children属性
    case GET_SUB_SUBJECT_LIST:
      const { parentId, subSubjectList } = action.data;
      return {
        total: prevState.total,
        items: prevState.items.map((subject) => {
          if (subject._id === parentId) {
            subject.children = subSubjectList;
          }
          return subject;
        }),
      };
    default:
      return prevState;
  }
}
