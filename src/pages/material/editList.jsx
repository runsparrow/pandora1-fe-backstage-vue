import { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, Select, TreeSelect, Radio } from 'antd'
import { goodTags } from '@utils/enumList'
import { gettreelist } from '@utils/utils'
import { connect } from 'dva'
import './editList.less'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};


const index = ({ List = [], onClose, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();
  const [goodTreeData, setGoodTreeData] = useState([])
  const [navTreeData, setNavTreeData] = useState([])
  const [memberList, setMemberList] = useState([])

  useEffect(() => {
    getgoodtree()
    getnavtree()
    getmember()
  }, [])

  useEffect(() => {
    console.log("List", List)
  }, [List])

  const getpicheight = () => {
    let materialList = document.getElementById("materialList")
    if (materialList) {
      let pch = document.body.clientHeight - materialList.getBoundingClientRect().top - "30%";
      return pch + "px"
    }
  }

  const onFinish = () => {
    form.validateFields().then((values) => {
      let ls = []
      for (let i = 1; List.length >= i; i++) {
        ls.push({
          id: values[`id_${i}`],
          name: values[`name_${i}`],
          tags: values[`tags_${i}`].length > 0 ? values[`tags_${i}`].join(",") : "",
          author: values[`author_${i}`],
          isOriginal: Number(values[`isOriginal_${i}`]) == 1 ? true : false,
          classifyId: values[`classifyId_${i}`].value, classifyName: values[`classifyId_${i}`].label,
          navigationId: values[`navigationId${i}`].value, navigationId: values[`navigationId${i}`].label,
          url: values[`url_${i}`]
        })
      }
      dispatch({
        type: "material/batchEdit",
        payload: ls
      }).then(res => {
        if (res) {
          onClose()
        }
      })
    })
  }

  const getgoodtree = () => {
    dispatch({
      type: "dictionary/getGoodsTree",
      payload: { key: "cms.goods.classify" }
    }).then(res => {
      setGoodTreeData(gettreelist(res))
    })
  }

  const getnavtree = () => {
    dispatch({
      type: "navTree/getnavtree",
      payload: { id: "-1" }
    }).then(res => {
      setNavTreeData(gettreelist(res))
    })
  }

  const getmember = () => {
    dispatch({
      type: "member/getList",
      payload: {
        keyWord: "",
        page: `1^9999`,
        date: "",
        sort: ""
      }
    }).then(res => {
      setMemberList(res.data)
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
                <img src={p.fullUrl} style={{ height: "150px" }} />
              </div>
              <div className="editform">
                <Form.Item label="素材名" name={`name_${index + 1}`} initialValue={p[`name`] || ""}>
                  <Input />
                </Form.Item>
                <Form.Item label="素材标签" name={`tags_${index + 1}`} initialValue={p[`tags`] ? p[`tags`].split(',') : []}>
                  <Select mode="tags" style={{ width: '100%' }}>
                  </Select>
                </Form.Item>
                <Form.Item label="素材分类" name={`classifyId_${index + 1}`} initialValue={p[`classifyId`] || []}>
                  <TreeSelect
                    treeData={goodTreeData}
                    allowClear
                    labelInValue
                    treeDefaultExpandAll
                  />
                </Form.Item>
                <Form.Item label="所属菜单" name={`navigationId${index + 1}`} initialValue={p[`navigationId`] || []}>
                  <TreeSelect
                    treeData={navTreeData}
                    allowClear
                    labelInValue
                    treeDefaultExpandAll
                  />
                </Form.Item>
                <Form.Item label="是否免费" name={`isOriginal_${index + 1}`} initialValue={p[`isOriginal`] ? 1 : 0}>
                  <Radio.Group options={[{ label: "否", value: 0 }, { label: "是", value: 1 }]} />
                </Form.Item>
                <Form.Item label="素材作者" name={`author_${index + 1}`} initialValue={p[`author`] || ""}>
                  <Select >
                    {memberList.map(p =>
                      <Option value={p.id}>{p.name}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item label="aaa" name={`id_${index + 1}`} style={{ display: "none" }} initialValue={p.id}>
                </Form.Item>
                <Form.Item label="aaa" name={`url_${index + 1}`} style={{ display: "none" }} initialValue={p.url}>
                </Form.Item>
              </div>
            </div>
          )
        }
      </Form>
    </Modal >
  )
}

export default connect(({ }) => ({}))(index)
