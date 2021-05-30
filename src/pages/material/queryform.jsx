import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Row, Col, TreeSelect } from 'antd'
import { gettreelist } from '@utils/utils'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option

const queryform = ({ formquery, resetform, dispatch }) => {
  const [form] = Form.useForm()
  const [goodTreeData, setGoodTreeData] = useState([])

  useEffect(() => {
    getgoodtree()
  }, [])

  const onFinish = (value) => {
    const param = {
      name: value.name ? value.name : "",
      classifyId: value.classifyId ? value.classifyId : "",
      tags: value.tags ? value.tags : ""
    }
    formquery(param)
  }

  const getgoodtree = () => {
    dispatch({
      type: "dictionary/getGoodsTree",
      payload: { key: "cms.goods.classify" }
    }).then(res => {
      setGoodTreeData(gettreelist(res))
    })
  }

  const resetfiled = () => {
    form.resetFields()
    resetform()
  }
  return (
    <Form layout="inline" form={form} style={{ marginBottom: "20px", padding: "20px 0 20px 0" }} onFinish={onFinish}>
      <Row style={{ width: "100%", marginBottom: "10px" }}>
        <Col span={6}>
          <FormItem name="name" label="素材名称">
            <Input />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem name="classifyId" label="素材分类">
            <TreeSelect
              treeData={goodTreeData}
              allowClear
              treeDefaultExpandAll
            />
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem name="tags" label="素材标签">
            <Input />
          </FormItem>
        </Col>
        <Col span={6} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <FormItem>
            <Button type="primary" htmlType="submit">查询</Button>
          </FormItem>
          <FormItem>
            <Button onClick={resetfiled}>重置</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
}

export default connect(({ }) => ({}))(queryform)