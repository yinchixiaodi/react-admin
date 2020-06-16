import request from "@utils/request";

// http://47.103.203.152/oauth/sign_in/digits
// 获取验证码
export function reqSendCode(mobile) {
  return request({
    url: "/oauth/sign_in/digits",
    method: "POST",
    data: { mobile },
  });
}

// 手机号登录
// http://47.103.203.152/oauth/mobile
export function reqMobileLogin(mobile, code) {
  return request({
    url: "/oauth/mobile",
    method: "POST",
    data: { mobile, code },
  });
}
