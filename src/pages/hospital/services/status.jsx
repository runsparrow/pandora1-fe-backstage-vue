import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getstatustree (params) {
  const { id } = params
  return request(`${APIHOSTNAME}/ASM/Hospital/Tree/SubsetById/${id}`)
}

export async function getGoodsTree (params) {
  const { key } = params
  return request(`${APIHOSTNAME}/ASM/Hospital/Tree/SubsetByKey/${key}`)
}

export async function editNode (params) {
  return request(`${APIHOSTNAME}/ASM/Hospital/Update/Single`, {
    method: "POST",
    data: params
  })
}

export async function addNode (params) {
  return request(`${APIHOSTNAME}/ASM/Hospital/Create/Single`, {
    method: "POST",
    data: params
  })
}

export async function delNode (params) {
  return request(`${APIHOSTNAME}/ASM/Hospital/Delete/Single`, {
    method: "POST",
    data: params
  })
}

