import { message } from 'antd';
import { getList } from '../services/article';

export default {
  namespace: 'article',
  state: {
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      if (response.result == '0') {
        return {
          data: response.row,
          total: response.total,
          success: true
        }
      } else {
        return {}
      }
    },

  },
  reducers: {
    saveNewRole(state, { payload }) {
      return {
        ...state,
        newrole: payload,
      };
    },
  },
  subscriptions: {

  },
};
