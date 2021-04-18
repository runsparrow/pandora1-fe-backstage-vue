import { APIHOSTNAME, UPLOADNAME } from '@constants/API';
import request from '@utils/request';

export async function getList (params) {
  return request(`${APIHOSTNAME}/CMS/Goods/Query/Page`, {
    method: "POST",
    data: params
  })
}

export async function batchUpload (params) {
  return request(`${UPLOADNAME}/v1/api/file/upload_big_file`, {
    method: "POST",
    data: params
  })
}

export async function batchDel (params) {
  return request(`${APIHOSTNAME}/CMS/Goods/Delete/Multiple`, {
    method: "POST",
    data: params
  })
}


