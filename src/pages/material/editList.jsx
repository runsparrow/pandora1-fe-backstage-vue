import { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { goodTags } from '@utils/enumList'
import './editList.less'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};


const index = ({ List = [], onClose }) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();

  const getpicheight = () => {
    let materialList = document.getElementById("materialList")
    if (materialList) {
      let pch = document.body.clientHeight - materialList.getBoundingClientRect().top - "30%";
      return pch + "px"
    }
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      console.log("values", values)
    })
  }

  return (
    <Modal
      title='批量编辑'
      width='60%'
      visible={true}
      onCancel={() => onClose()}
      onOk={onFinish}
      cancelText="取消"
      okText="保存"
      bodyStyle={{ height: "600px", overflowY: "scroll" }}
    >
      <Form {...layout} form={form}>
        {
          List.map((p, index) =>
            <div className="formform" key={index} >
              <div className="imgform">
                {p.fullUrl}
              </div>
              <div className="editform">
                <Form.Item label="素材名" name={`name_${index + 1}`}>
                  <Input />
                </Form.Item>
                <Form.Item label="素材标签" name={`tags_${index + 1}`}>
                  <Select mode="multiple" options={goodTags} />
                </Form.Item>
                <Form.Item label="素材作者" name={`author_${index + 1}`}>
                  <Select options={goodTags} />
                </Form.Item>
              </div>
            </div>
          )
        }
      </Form>
    </Modal >
  )
}

export default index
