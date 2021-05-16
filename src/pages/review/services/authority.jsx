import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function review (params) {
  return request(`${APIHOSTNAME}/CMS/Authority/Create/ToStatus`, {
    method: "POST",
    data: params
  })
}

