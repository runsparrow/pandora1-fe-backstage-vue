import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getnavtree (params) {
  const { id } = params
  return request(`${APIHOSTNAME}/CMS/Navigation/Tree/SubsetById/${id}`)
}

export async function addNode (params) {
  return request(`${APIHOSTNAME}/CMS/Navigation/Create/Single`, {
    method: "POST",
    data: params
  })
}

export async function delNode (params) {
  return request(`${APIHOSTNAME}/CMS/Navigation/Delete/Single`, {
    method: "POST",
    data: params
  })
}

export async function editNode (params) {
  return request(`${APIHOSTNAME}/CMS/Navigation/Update/Single`, {
    method: "POST",
    data: params
  })
}

