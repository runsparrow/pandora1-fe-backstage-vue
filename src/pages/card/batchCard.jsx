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

  const submit = () => {
    form.validateFields().then(values => {
      const { cardQuantity } = values
      const params = {
        entity: { ...values },
        cardQuantity
      }
      console.log("params", params)
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
      <Form.Item label="备注" name="remark" >
        <TextArea />
      </Form.Item>
    </Form>
  </Modal >
}

export default connect(() => ({}))(index)