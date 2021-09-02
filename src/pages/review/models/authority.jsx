import { message } from 'antd';
import { getList, add, reviewAuthority, reviewUser, reviewGoods, getGoodsList, getAuthorityList } from '../services/authority';


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
    *getAuthorityList ({ payload }, { call, put }) {
      const response = yield call(getAuthorityList, payload);
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
    *reviewAuthority ({ payload }, { call, put }) {
      const response = yield call(reviewAuthority, payload);
      if (response.result) {
        message.success("审批成功")
        return true
      } else {
        message.error("审批失败")
        return false
      }
    },
    *reviewUser ({ payload }, { call, put }) {
      const response = yield call(reviewUser, payload);
      if (response.result) {
        message.success("审批成功")
        return true
      } else {
        message.error("审批失败")
        return false
      }
    },
    *reviewGoods ({ payload }, { call, put }) {
      const response = yield call(reviewGoods, payload);
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
