import { useState, useEffect } from 'react'
import { Input, Tree, Modal, Form, Button } from 'antd'
import { connect } from 'dva'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Search } = Input
const { TreeNode } = Tree

const index = (props) => {
  const { treeData, dispatch, selectNode, getNavList } = props
  const [isShow, setIsShow] = useState(false)
  const [form] = Form.useForm();
  const [info, setInfo] = useState({})

  const onSelect = (keys, item) => {
    selectNode(item.node.row)
  }

  const addNode = (item) => {
    form.setFieldsValue(item)
    setInfo(item)
    setIsShow(true)
  }

  const delNode = (item) => {
    dispatch({
      type: "dictionary/delNode",
      payload: {
        id: item.key
      }
    }).then(res => {
      getNavList()
    })
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: "dictionary/addNode",
        payload: {
          pid: info.key,
          name: values.name,
          key: values.key,
          value: values.value,
        }
      }).then(res => {
        if (res) {
          setIsShow(false)
          getNavList()
        }
      })
    })
  }

  const close = () => {
    form.setFieldsValue({})
    setIsShow(false)
    setInfo({})
  }

  return (<div>
    <Tree
      onSelect={onSelect}
      checkable={false}
      treeData={treeData}
      titleRender={res => {
        return <div>{res.title}
          <PlusOutlined style={{ margin: "0 10px" }} onClick={() => addNode(res)} />
          {
            res.key != "1" ? <DeleteOutlined onClick={() => { delNode(res) }} /> : null
          }
        </div>
      }} />
    {
      isShow ? <Modal
        title="新建字典"
        visible={true}
        onCancel={() => close()}
        footer={<div style={{ textAlign: 'right' }}>
          <Button onClick={close} style={{ marginRight: "20px" }}>取消</Button>
          <Button type="primary" onClick={onFinish}>确定</Button>
        </div>}>
        <Form
          form={form}
          initialValues={info}
        >
          <Form.Item
            label="字段name"
            name="name"
            rules={[{ required: true, message: '请输入字段name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="字段key"
            name="key"
            rules={[{ required: true, message: '请输入字段key!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="字段value"
            name="value"
            rules={[{ required: true, message: '请输入字段value!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
        : null
    }
  </div>)
}

export default connect(({ }) => ({}))(index)