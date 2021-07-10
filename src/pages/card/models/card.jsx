import { message } from 'antd';
import { getList, batchcard } from '../services/card';


export default {
  namespace: 'card',
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
    *batchCard ({ payload }, { call, put }) {
      const response = yield call(batchcard, payload);
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
