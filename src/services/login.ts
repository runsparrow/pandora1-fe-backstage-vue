import request from '@/utils/request';
import { APIHOSTNAME } from '@constants/API'

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  let param = {
    name: params.userName,
    password: params.password
  }
  return request(`${APIHOSTNAME}/AVM/Auth/GetToken`, {
    method: 'POST',
    data: param,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
