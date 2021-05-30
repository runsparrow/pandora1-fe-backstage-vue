import { message } from 'antd';
import { getList, add, review, getGoodsList } from '../services/authority';


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
    *getGoodsList ({ payload }, { call, put }) {
      const response = yield call(getGoodsList, payload);
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
      console.log("response", response)
      if (response.result) {
        message.success("审批成功")
        return true
      } else {
        message.error("审批失败")
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
