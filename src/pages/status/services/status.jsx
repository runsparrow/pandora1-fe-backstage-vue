import { APIHOSTNAME } from '@constants/API';
import request from '@utils/request';

export async function getstatustree (params) {
  const { id } = params
  return request(`${APIHOSTNAME}/WFM/Status/Tree/SubsetById/${id}`)
}

export async function edit (params) {
  return request(`${APIHOSTNAME}/WFM/Status/Update/Single`, {
    method: "POST",
    data: params
  })
}

