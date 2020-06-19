import { reqGetUserInfo, reqGetMenu } from "@api/acl/login";
import { GET_USER_INFO, GET_MENU } from "./constants";
// 获取用户信息
const getUserInfoSync = (info) => ({
  type: GET_USER_INFO,
  data: info,
});

export const getUserInfo = () => {
  return (dispatch) => {
    return reqGetUserInfo().then((response) => {
      dispatch(getUserInfoSync(response));
      return response;
    });
  };
};

// 获取菜单数据
const getMenuSync = (permissionList) => ({
  type: GET_MENU,
  data: permissionList,
});

export const getMenu = () => {
  return (dispatch) => {
    return reqGetMenu().then((response) => {
      dispatch(getMenuSync(response.permissionList));
      return response.permissionList;
    });
  };
};
