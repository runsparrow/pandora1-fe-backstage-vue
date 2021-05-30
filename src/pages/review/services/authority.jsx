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

export async function review (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Update/ToStatus`, {
    method: "POST",
    data: params
  })
}


