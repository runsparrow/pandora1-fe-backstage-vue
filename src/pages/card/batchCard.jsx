import { useState, useEffect } from 'react'
import { Form, Input, Radio, Button, Modal, InputNumber } from 'antd'
import { connect } from 'dva'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const { TextArea } = Input

const index = ({ dispatch, close }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ daysLimit: 365 })
  }, [])

  const submit = () => {
    form.validateFields().then(values => {
      const { cardQuantity } = values
      const params = {
        entity: { ...values },
        cardQuantity
      }
      dispatch({
        type: "card/batchCard",
        payload: params
      }).then(res => {
        res && close()
      })
    })
  }

  return <Modal
    title={"批量开卡"}
    visible={true}
    footer={
      <div>
        <Button style={{ marginRight: "10px" }} onClick={() => close()}>取消</Button>
        <Button type="primary" onClick={submit}>提交</Button>
      </div>
    }
  >
    <Form form={form} {...layout}>
      <Form.Item label="卡号前缀" name="cardPrefix" rules={[{ required: true, message: '请输入卡号前缀!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="开卡数量" name="cardQuantity" rules={[{ required: true, message: '请输入开卡数量!' }]}>
        <InputNumber style={{ width: "100%" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="有效期天数限制" name="daysLimit" rules={[{ required: true, message: '请输入有效期天数限制!' }]}>
        <InputNumber style={{ width: "100%" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="是否可下载" name="isDown" >
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="下载限制" name="downLimit" >
        <InputNumber style={{ width: "100%" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="是否可上传" name="isUpload" >
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="上传限制" name="uploadLimit">
        <InputNumber style={{ width: "100%" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="是否可购买" name="isBuy">
        <Radio.Group options={[{ label: "是", value: true }, { label: "否", value: false }]} />
      </Form.Item>
      <Form.Item label="购买限制" name="buyLimit" >
        <InputNumber style={{ width: "100%" }} min={0} step={1} />
      </Form.Item>
      <Form.Item label="备注" name="remark" >
        <TextArea />
      </Form.Item>
    </Form>
  </Modal >
}

export default connect(() => ({}))(index)