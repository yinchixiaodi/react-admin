import { reqLogin, reqLogout } from "@api/acl/login";
import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";

/**
 * 登陆
 */
const loginSync = (token) => ({
  type: LOGIN_SUCCESS,
  data: token,
});

export const login = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password).then(({ token }) => {
      dispatch(loginSync(token));
      return token;
    });
  };
};
/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

/**
 * 登出
 */
export const logout = () => {
  return (dispatch) => {
    return reqLogout().then(() => {
      dispatch(removeToken());
    });
  };
};
