import { message } from 'antd';
import { getList } from '../services/order';

export default {
  namespace: 'order',
  state: {
  },
  effects: {
    *getList ({ payload }, { call, put }) {
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
