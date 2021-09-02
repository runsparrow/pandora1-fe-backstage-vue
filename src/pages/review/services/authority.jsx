import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function getGoodsList (params) {
  return request(`${APIHOSTNAME}/CMS/Goods/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function getAuthorityList (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function reviewAuthority (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Update/ToStatus`, {
    method: "POST",
    data: params
  })
}

export async function reviewUser (params) {
  return request(`${APIHOSTNAME}/AVM/User/Update/ToStatus`, {
    method: "POST",
    data: params
  })
}

export async function reviewGoods (params) {
  return request(`${APIHOSTNAME}/CMS/Goods/Update/ToStatus`, {
    method: "POST",
    data: params
  })
}


