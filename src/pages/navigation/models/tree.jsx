import { message } from 'antd';
import { getnavtree, addNode, delNode, editNode } from '../services/tree';

export default {
  namespace: 'navTree',
  state: {
  },
  effects: {
    *getnavtree ({ payload }, { call, put }) {
      const response = yield call(getnavtree, payload);
      if (response.result) {
        return response.tree
      } else {
        return []
      }
    },
    *addNode ({ payload }, { call, put }) {
      const response = yield call(addNode, payload);
      if (response.result) {
        return true
      } else {
        return false
      }
    },
    *delNode ({ payload }, { call, put }) {
      const response = yield call(delNode, payload);
      if (response.result) {
        return true
      } else {
        return false
      }
    },
    *editNode ({ payload }, { call, put }) {
      const response = yield call(editNode, payload);
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
