import { message } from 'antd';
import { getList, add, edit,del } from '../services/member';


export default {
  namespace: 'member',
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
    *add ({ payload }, { call, put }) {
      const response = yield call(add, payload);
      if (response.result) {
        return true
      } else {
        return false
      }
    },
    *edit ({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      if (response.result) {
        return true
      } else {
        return {}
      }
    },
    *del ({ payload }, { call, put }) {
      const response = yield call(del, payload);
      if (response.result) {
        return true
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
