import { message } from 'antd';
import { getstatustree, edit } from '../services/status';

export default {
  namespace: 'statusTree',
  state: {
  },
  effects: {
    *getstatustree ({ payload }, { call, put }) {
      const response = yield call(getstatustree, payload);
      if (!response.error) {
        return response.tree
      } else {
        return []
      }
    },
    *edit ({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      if (response.result) {
        message.success("操作成功")
        return true
      } else {
        message.success("操作失败")
        return false
      }
    },
  },
  reducers: {
  },
  subscriptions: {

  },
};
