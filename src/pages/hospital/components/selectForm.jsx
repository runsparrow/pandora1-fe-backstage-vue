import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Cascader } from 'antd'
import provinceCity from '@utils/city'
import { getAreaName } from '@utils/utils'
import { connect } from 'dva'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const index = ({ info, dispatch, refresh }) => {
  const [form] = Form.useForm();
  const [formform, setFormform] = useState({})

  useEffect(() => {
    if (info.provinceCode && info.cityCode && info.divisionCode) {
      info.area = [`${info.provinceCode}`, `${info.cityCode}`, `${info.divisionCode}`]
    } else {
      info.area = []
    }
    form.setFieldsValue(info)
    return () => { }
  }, [info])

  const onFinish = (item) => {
    if (item.area && item.area.length == 3) {
      item.provinceCode = item.area[0]
      item.cityCode = item.area[1]
      item.divisionCode = item.area[2]
      item.provinceName = getAreaName(item.area[0])
      item.cityName = getAreaName(item.area[1])
      item.divisionName = getAreaName(item.area[2])
    }
    dispatch({
      type: "hospital/editNode",
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
      <Form.Item label="地区" name="area">
        <Cascader options={provinceCity} />
      </Form.Item>
      <Form.Item label="电话" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input />
      </Form.Item>
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