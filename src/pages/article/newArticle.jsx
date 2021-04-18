import { useEffect, useState } from 'react'
import { Card, Form, Select, Input, Switch, Button } from 'antd'
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
    console.log("submit", values)
  }

  return (
    <PageContainer>
      <Card>
        <Form form={form} {...layout} onFinish={onFinish}>
          <Form.Item label="标题">
            <Input />
          </Form.Item>
          <Form.Item label="简介">
            <Input />
          </Form.Item>
          <Form.Item label="内容">
            <BraftEditor style={{ border: "1px solid #d4d7da" }} />
          </Form.Item>
          <Form.Item label="选择发布模块">
            <Select />
          </Form.Item>
          <Form.Item label="文章来源">
            <Input />
          </Form.Item>
          <Form.Item label="文章来源路径">
            <Input />
          </Form.Item>
          <Form.Item label="是否显示">
            <Switch />
          </Form.Item>
          <Form.Item label="是否允许评论">
            <Switch />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button style={{ marginRight: "10px" }}>重置</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  )
}

export default index
