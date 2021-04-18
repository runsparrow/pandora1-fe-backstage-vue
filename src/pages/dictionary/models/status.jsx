import { message } from 'antd';
import { getstatustree, editNode, delNode, addNode } from '../services/status';

export default {
  namespace: 'dictionary',
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
    *editNode ({ payload }, { call, put }) {
      const response = yield call(editNode, payload);
      if (response.error == null) {
        message.success("操作成功")
        return true
      } else {
        message.success("操作失败")
        return false
      }
    },
    *delNode ({ payload }, { call, put }) {
      const response = yield call(delNode, payload);
      if (response.error == null) {
        message.success("操作成功")
        return true
      } else {
        message.success("操作失败")
        return false
      }
    },
    *addNode ({ payload }, { call, put }) {
      const response = yield call(addNode, payload);
      if (response.error == null) {
        message.success("操作成功")
        return true
      } else {
        message.success("操作失败")
        return false
      }
    },
  },
  reducers: {
  },
  subscriptions: {

  },
};
