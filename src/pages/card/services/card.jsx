import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Card/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function batchcard(params){
  return request(`${APIHOSTNAME}/CMS/Card/Create/Batch`, {
    method: "POST",
    data: params
  })
}



