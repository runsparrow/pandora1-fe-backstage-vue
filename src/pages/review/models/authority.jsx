import { message } from 'antd';
import { getList, add, review } from '../services/authority';


export default {
  namespace: 'authority',
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
    *review ({ payload }, { call, put }) {
      const response = yield call(review, payload);
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
