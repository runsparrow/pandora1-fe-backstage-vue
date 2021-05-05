import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Member/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function add (params) {
  return request(`${APIHOSTNAME}/CMS/Member/Create/Single`, {
    method: "POST",
    data: params
  })
}

export async function edit (params) {
  return request(`${APIHOSTNAME}/CMS/Member/Update/Single`, {
    method: "POST",
    data: params
  })
}

export async function del (params) {
  return request(`${APIHOSTNAME}/CMS/Member/Delete/Single`, {
    method: "POST",
    data: params
  })
}


