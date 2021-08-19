import { useState, useEffect } from 'react'
import { Modal, Form, Input, Radio, Button, InputNumber } from 'antd'
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
          type: "memberpower/add",
          payload: values
        }).then(res => {
          if (res) close()
        })
      } else {
        dispatch({
          type: "memberpower/edit",
          payload: { ...info, ...values }
        }).then(res => {
          if (res) close()
        })
      }
    })
  }

  return <Modal
    title={isNew ? "新建套餐" : "编辑套餐"}
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
      <Form.Item label="套餐名称" name="name" rules={[{ required: true, message: '请输入套餐名称!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="价格" name="price" rules={[{ required: true, message: '请输入价格!' }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="有效期天数限制" name="daysLimit" rules={[{ required: true, message: '请输入有效期天数限制!' }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="是否可下载" name="isDown" rules={[{ required: true, message: '请选择是否可下载!' }]}>
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="下载限制" name="downLimit" rules={[{ required: true, message: '请输入下载限制!' }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="是否可上传" name="isUpload" rules={[{ required: true, message: '请选择是否可上传!' }]}>
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="上传限制" name="uploadLimit" rules={[{ required: true, message: '请输入上传限制!' }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="是否可购买" name="isBuy" rules={[{ required: true, message: '请选择是否可购买!' }]}>
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="购买限制" name="buyLimit" rules={[{ required: true, message: '请输入购买限制!' }]}>
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  </Modal >
}

export default connect(({ }) => ({}))(index)