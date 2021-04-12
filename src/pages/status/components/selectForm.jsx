import { useState, useEffect } from 'react'
import { Form, Button, Input } from 'antd'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const index = (props) => {
  const [form] = Form.useForm();
  const { info } = props
  const [formform, setFormform] = useState({})

  useEffect(() => {
    form.setFieldsValue(info)
    return () => { }
  }, [info])

  const onFinish = (item) => {
    console.log("onFinish", item)
  }

  return (
    <Form
      {...layout}
      form={form}
      initialValues={formform}
      onFinish={onFinish}
    >
      <Form.Item label="name" name="name"><Input /></Form.Item>
      <Form.Item label="key" name="key"><Input /></Form.Item>
      <Form.Item label="value" name="value"><Input /></Form.Item>
      <Form.Item label="desc" name="desc"><Input /></Form.Item>
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

export default index