import { useState, useEffect } from 'react'
import { Modal, Form, Input, Radio, Button } from 'antd'
import { connect } from 'dva'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const index = ({ dispatch, close, isNew = true, info = {} }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (Object.keys(info).length > 0) {
      form.setFieldsValue(info)
    }
    return () => { }
  }, [info])

  const submit = () => {
    form.validateFields().then((values) => {
      if (isNew) {
        dispatch({
          type: "users/add",
          payload: values
        }).then(res => {
          if (res) close()
        })
      } else {
        dispatch({
          type: "users/edit",
          payload: { ...info, ...values }
        }).then(res => {
          if (res) close()
        })
      }
    })
  }

  return <Modal
    title={isNew ? "新建用户" : "编辑用户"}
    visible={true}
    onCancel={() => close()}
    footer={
      <div>
        <Button style={{ marginRight: "10px" }} onClick={() => close()}>取消</Button>
        <Button type="primary" onClick={submit}>提交</Button>
      </div>
    }
  >
    <Form form={form} {...layout}>
      <Form.Item label="用户名" name="name" rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="手机" name="mobile" rules={[{ required: true, message: '请输入手机号!' }]}>
        <Input />
      </Form.Item>
    </Form>
  </Modal >
}

export default connect(({ }) => ({}))(index)