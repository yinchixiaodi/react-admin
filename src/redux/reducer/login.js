import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";

const initToken = window.localStorage.getItem("user_token");
// const initToken = localStorage.getItem("user_token") || "";

function token(prevState = initToken, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.data;
    case REMOVE_TOKEN:
      return "";
    default:
      return prevState;
  }
}

export default token;
