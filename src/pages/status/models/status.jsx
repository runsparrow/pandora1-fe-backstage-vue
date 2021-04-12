import { message } from 'antd';
import { getstatustree } from '../services/status';

export default {
  namespace: 'statusTree',
  state: {
  },
  effects: {
    *getstatustree ({ payload }, { call, put }) {
      const response = yield call(getstatustree, payload);
      if (response.error == null) {
        return response.tree
      } else {
        return []
      }
    },
  },
  reducers: {
  },
  subscriptions: {

  },
};
