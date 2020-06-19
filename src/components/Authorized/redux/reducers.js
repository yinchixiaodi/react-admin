import { GET_USER_INFO, GET_MENU } from "./constants";

const initUser = {
  name: "",
  avatar: "",
  permissionValueList: [],
  permissionList: [],
};

export default function user(prevState = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...prevState,
        ...action.data,
      };
    case GET_MENU:
      return {
        ...prevState,
        permissionList: action.data,
      };
    default:
      return prevState;
  }
}
