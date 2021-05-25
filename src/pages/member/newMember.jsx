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
          type: "member/add",
          payload: values
        }).then(res => {
          if (res) close()
        })
      } else {
        dispatch({
          type: "member/edit",
          payload: { ...info, ...values }
        }).then(res => {
          if (res) close()
        })
      }
    })
  }

  return <Modal
    title={isNew ? "新建会员" : "编辑会员"}
    visible={true}
    footer={
      <div>
        <Button style={{ marginRight: "10px" }} onClick={() => close()}>取消</Button>
        <Button type="primary" onClick={submit}>提交</Button>
      </div>
    }
  >
    <Form form={form} {...layout}>
      <Form.Item label="会员名称" name="name" rules={[{ required: true, message: '请输入会员名称!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="手机" name="mobile" rules={[{ required: true, message: '请输入手机号!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="自有用户" name="isSelf" rules={[{ required: true, message: '请选择自有用户!' }]}>
        <Radio.Group options={[{ label: "否", value: 0 }, { label: "是", value: 1 }]} />
      </Form.Item>
      <Form.Item label="性别" name="gender" rules={[{ required: true, message: '请选择性别!' }]}>
        <Radio.Group options={[{ label: "男", value: "m" }, { label: "女", value: "f" }, { label: "保密", value: "s" }]} />
      </Form.Item>
      <Form.Item label="状态" name="statusId" initialValue={1} rules={[{ required: true, message: '请选择状态!' }]}>
        <Radio.Group options={[{ label: "正常", value: 1 }, { label: "关闭", value: -1 }, { label: "冻结", value: -2 }]} />
      </Form.Item>
    </Form>
  </Modal >
}

export default connect(({ }) => ({}))(index)