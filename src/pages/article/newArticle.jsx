import { useEffect, useState } from 'react'
import { Card, Form, Select, Input, Switch, Button, Radio } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { PageContainer } from '@ant-design/pro-layout';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const index = () => {
  const [form] = Form.useForm()

  const onFinish = (values) => {
    values.content = values.content.toHTML()
    console.log("submit", values)
  }

  const reset = () => {
    form.resetFields()
  }

  return (
    <PageContainer>
      <Card>
        <Form form={form} {...layout} onFinish={onFinish}>
          <Form.Item label="标题" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="summary">
            <Input />
          </Form.Item>
          <Form.Item label="内容" name="content">
            <BraftEditor style={{ border: "1px solid #d4d7da" }} />
          </Form.Item>
          <Form.Item label="选择发布模块" name="">
            <Select />
          </Form.Item>
          <Form.Item label="文章来源" name="source">
            <Input />
          </Form.Item>
          <Form.Item label="文章来源路径" name="sourceUrl">
            <Input />
          </Form.Item>
          <Form.Item label="是否显示" name="isDisplay">
            <Radio.Group options={[{ label: "否", value: false }, { label: "是", value: true }]} />
          </Form.Item>
          <Form.Item label="是否允许评论" name="isDiscuss">
            <Radio.Group options={[{ label: "否", value: false }, { label: "是", value: true }]} />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button style={{ marginRight: "10px" }} onClick={reset}>重置</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}

export default index
