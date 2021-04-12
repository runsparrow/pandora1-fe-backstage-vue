import { useState, useEffect } from 'react'
import { Input, Tree, Modal, Form, Button } from 'antd'
import { connect } from 'dva'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Search } = Input
const { TreeNode } = Tree

const index = (props) => {
  const { treeData, dispatch, selectNode } = props

  const onSelect = (keys, item) => {
    selectNode(item.node.row)
  }

  return (<div>
    <Tree checkable
      onSelect={onSelect}
      checkable={false}
      treeData={treeData} />
  </div>)
}

export default index