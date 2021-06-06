import { message } from 'antd';
import { getList } from '../services/recharge';

export default {
  namespace: 'recharge',
  state: {
  },
  effects: {
    *getList ({ payload }, { call, put }) {
      const response = yield call(getList, payload);
      if (response.result) {
        return {
          data: response.rows,
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
