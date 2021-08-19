import React, { useState, useEffect } from 'react'
import { Form, Button, Input } from 'antd'
import { connect } from 'dva'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const index = ({ info, dispatch, refresh }) => {
  const [form] = Form.useForm();
  const [formform, setFormform] = useState({})

  useEffect(() => {
    form.setFieldsValue(info)
    return () => { }
  }, [info])

  const onFinish = (item) => {
    console.log("onFinish", item)
    dispatch({
      type: "dictionary/editNode",
      payload: { ...info, ...item }
    }).then(res => {
      refresh()
    })
  }

  return (
    <Form
      {...layout}
      form={form}
      initialValues={formform}
      onFinish={onFinish}
    >
      <Form.Item label="名称" name="name"><Input /></Form.Item>
      <Form.Item label="键" name="key"><Input /></Form.Item>
      <Form.Item label="值" name="value"><Input /></Form.Item>
      <Form.Item label="备注" name="desc"><Input /></Form.Item>
      <Form.Item>
        <div style={{ margin: "20px 0", textAlign: "right" }}>
          <Button style={{ marginRight: "10px" }}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}

export default connect(({ }) => ({}))(index)