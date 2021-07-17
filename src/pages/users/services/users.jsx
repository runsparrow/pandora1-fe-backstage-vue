import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/AVM/User/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function add (params) {
  return request(`${APIHOSTNAME}/AVM/User/Create/ToStatus`, {
    method: "POST",
    data: {
      ...params,
      key: "avm.user.open"
    }
  })
}

export async function edit (params) {
  return request(`${APIHOSTNAME}/AVM/User/Update/Single`, {
    method: "POST",
    data: params
  })
}

export async function del (params) {
  return request(`${APIHOSTNAME}/AVM/User/Delete/Single`, {
    method: "POST",
    data: params
  })
}


