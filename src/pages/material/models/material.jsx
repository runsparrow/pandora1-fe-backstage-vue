import { message } from 'antd';
import { getList, batchUpload, batchDel, review, batchEdit } from '../services/material';

export default {
  namespace: 'material',
  state: {
  },
  effects: {
    *getList ({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      if (response.error == null) {
        return response.rows
      } else {
        return []
      }
    },
    *batchUpload ({ payload }, { call, put }) {
      const response = yield call(batchUpload, payload);
      if (response.code == 200) {
        return response.data
      } else {
        message.error("上传失败")
        return {}
      }
    },
    *batchDel ({ payload }, { call, put }) {
      const response = yield call(batchDel, payload);
      if (response.error == null) {
        message.success("删除成功")
        return true
      } else {
        message.error("删除失败")
        return false
      }
    },
    *review ({ payload }, { call, put }) {
      const response = yield call(review, payload);
      if (response.result) {
        return true
      } else {
        return false
      }
    },
    *batchEdit ({ payload }, { call, put }) {
      const response = yield call(batchEdit, payload);
      if (response.result) {
        return true
      } else {
        return false
      }
    },
  },
  reducers: {
    saveNewRole (state, { payload }) {
      return {
        ...state,
        newrole: payload,
      };
    },
  },
  subscriptions: {

  },
};
