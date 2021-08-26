import { useState, useEffect } from 'react'
import { Input, Tree, Modal, Form, Button } from 'antd'
import { connect } from 'dva'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Search } = Input
const { TreeNode } = Tree

const index = (props) => {
  const { treeData, dispatch, getNavList } = props
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(false)
  const [isEdit, setisEdit] = useState(false)
  const [info, setInfo] = useState(null)


  const onCheck = (checked, e) => {
    getroleprojectid(checked)
  }

  const checkedKeyslist = () => {
    return orgDetail.map(p => p.id)
  }

  const addNode = (item) => {
    form.setFieldsValue(item)
    setInfo(item)
    setisEdit(false)
    setIsShow(true)
  }

  const editNode = (item) => {
    form.setFieldsValue(item)
    setInfo(item)
    setisEdit(true)
    setIsShow(true)
  }

  const delNode = (item) => {
    dispatch({
      type: "navTree/delNode",
      payload: {
        id: item.key
      }
    }).then(res => {
      getNavList()
    })
  }

  const close = () => {
    form.setFieldsValue({})
    setIsShow(false)
    setInfo({})
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: isEdit ? "navTree/editNode" : "navTree/addNode",
        payload: isEdit ? { ...info.row, name: values.title, key: values.title } : {
          pid: info.key,
          name: values.title,
          key: values.title,
        }
      }).then(res => {
        if (res) {
          setIsShow(false)
          getNavList()
        }
      })
    })
  }

  return (<div>
    <Tree
      checkable={false}
      treeData={treeData}
      titleRender={res => {
        return <div>{res.title}
          <PlusOutlined style={{ margin: "0 10px" }} onClick={() => addNode(res)} />
          <EditOutlined style={{ marginRight: "10px" }} onClick={() => editNode(res)} />
          {
            res.key != "1" ? <DeleteOutlined onClick={() => { delNode(res) }} /> : null
          }
        </div>
      }}
    />
    {
      isShow ? <Modal
        title={isEdit ? "编辑菜单" : "新建菜单"}
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
            label="菜单名称"
            name="title"
            rules={[{ required: true, message: '请输入菜单名称!' }]}
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