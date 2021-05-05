import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Serial/Query/Page`, {
    method: "POST",
    data: params
  })
}



