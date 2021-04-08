import { useState, useEffect } from 'react'
import { Form, Input, Button, Divider, Row, Col } from 'antd'
import SearchInput from '../SearchInput'
import CheckBoxGroup from '../CheckBoxGroup'
import RangeDatePicker from '../RangeDatePicker'
import SearchSelect from '../SearchSelect'
import './index.less'

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 18 },
  },
};

const index = (props) => {
  const [form] = Form.useForm();
  const { list, onQueryForm, onFormRest } = props
  const [isToggle, setIsToggle] = useState(true)

  const getComponent = (item) => {
    switch (item.type) {
      case "searchinput":
        return <SearchInput option={item.option} />
        break;
      case "checkboxgroup":
        return <CheckBoxGroup option={item.option} />
        break;
      case "rangdatepicker":
        return <RangeDatePicker />
        break;
      case "searchselect":
        return <SearchSelect option={item.option} />
        break;
    }
  }

  const toggle = () => {
    setIsToggle(!isToggle)
  }

  const rest = () => {
    form.resetFields()
    onFormRest()
  }

  const showComponents = () => {
    let res = isToggle ? list.slice(0, 1) : list
    let rlist = []

    for (let i = 0; i < Math.round(res.length / 2); i++) {
      rlist.push(i)
    }

    return rlist.map((p, index) =>
      <Row key={index}>
        <Col span={12}>
          <Form.Item
            key={index * 2}
            label={res[index * 2].label}
            name={res[index * 2].value}
          >
            {getComponent(res[index * 2])}
          </Form.Item>
        </Col>
        <Col span={12}>
          {
            res.length > (index * 2 + 1) ?
              <Form.Item
                key={index * 2 + 1}
                label={res[index * 2 + 1].label}
                name={res[index * 2 + 1].value}
              >
                {getComponent(res[index * 2 + 1])}
              </Form.Item>
              : <div className={isToggle ? "toggletop" : "togglebottom"}>
                <div>
                  <Button type="link" onClick={rest}>
                    清空
                </Button>
                  <Divider type="vertical" />
                  <Button type="link" onClick={toggle}>
                    {isToggle ? `展开` : `收起`}
                  </Button>
                </div>
              </div>
          }
        </Col>
      </Row>)
  }

  const onValuesChange = (changedValues, allValues) => {
    let res = allValues
    for (let i in res) {
      if (res[i] && res[i].changedValue) {
        res[i] = res[i].changedValue
      }
    }
    onQueryForm(res)
  }

  return (
    <div className="body">
      <Form
        form={form}
        name="basic"
        {...formItemLayout}
        onValuesChange={onValuesChange}
      >
        {showComponents()}
      </Form>
      {
        list.length % 2 == 0 && !isToggle ?
          <div className="togglebottom">
            <div>
              <Button type="link" onClick={rest}>
                清空
                </Button>
              <Divider type="vertical" />
              <Button type="link" onClick={toggle}>
                收起
              </Button>
            </div>
          </div>
          : null
      }
    </div >
  )
}

export default index