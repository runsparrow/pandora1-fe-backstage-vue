import { useState, useEffect, useRef } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { PictureOutlined } from '@ant-design/icons'
import { Card, Table, Button, Select, Divider, Modal, message } from 'antd'
import { PushpinFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
const { Option } = Select
const { confirm } = Modal;

const index = (props) => {
  const { dispatch } = props
  const uTable = useRef()
  const [selectedRow, setSelectedRow] = useState([])
  const [scroll, setScroll] = useState({ x: "1000px" })
  const [isShow, setIsShow] = useState(false)
  const [imgUrl, setImgUrl] = useState("")
  const [column, setColumn] = useState([
    {
      title: "会员名称",
      dataIndex: "memberName",
      width: 200,
    },
    {
      title: "真实名称",
      dataIndex: "realName",
      search: false,
      width: 200,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      search: false,
      width: 200
    },
    {
      title: "手机",
      dataIndex: "mobile",
      width: 200
    },
    {
      title: "头像",
      dataIndex: "idCardFUrl",
      width: 200,
      search: false,
      render: res => {
        return <div><PictureOutlined onClick={() => getimg(res)} /></div>
      }
    },
    {
      title: "注册时间",
      dataIndex: "registDateTime",
      search: false,
      width: 200
    },
    {
      title: "状态",
      dataIndex: "statusName",
      search: false,
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      search: false,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => review(item)}>审核</a>
      </div>
    },
  ])

  const review = (item) => {
    confirm({
      title: '审核操作',
      icon: <PushpinFilled />,
      content: '是否审核通过？',
      okText: "审核通过",
      cancelText: "审核不通过",
      onOk () {
        dispatch({
          type: "authority/review",
          payload: { entity: { id: item.id }, statusKey: "cms.authority.approver.pass" }
        }).then(res => {
          closerefresh()
        })
      },
      onCancel () {
        dispatch({
          type: "authority/review",
          payload: { entity: { id: item.id }, statusKey: "cms.authority.approver.refuse" }
        }).then(res => {
          closerefresh()
        })
      },
    });
  }

  const getList = (page = { pageNum: 1, pageSize: 20 }) => {
    const { memberName, mobile } = page
    let keyword = ""
    if (memberName)
      keyword += `^memberName=${memberName}`

    if (mobile)
      keyword += `^mobile=${mobile}`

    let params = {
      keyWord: "",
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: [1]
    }
    return dispatch({
      type: "authority/getList",
      payload: params
    }).then(res => {
      return res
    })
  }

  const onSelectedRowsChange = (item) => {
    setSelectedRow(item)
  }

  const closerefresh = () => {
    setIsShow(false)
    setSelectedRow([])
    uTable.current.getFresh()
  }

  const getimg = (item) => {
    if (item) {
      setImgUrl(item)
      setIsShow(true)
    } else {
      message.error("没有数据")
    }
  }

  return (
    <Card style={{ marginTop: "20px" }}>
      <UniversalTable
        childRef={uTable}
        request={
          async (params = {}) => {
            let resultparams = { pageNum: params.current, pageSize: params.pageSize, ...params }
            delete resultparams.current
            return getList(resultparams)
          }
        }
        isSelect={false}
        toolButtonList={null}
        onSelectedRowsChange={onSelectedRowsChange}
        column={column}
        scroll={scroll}
        isSearch
        rowKey="id" />
      {
        isShow ? <Modal title="查看" visible={true} footer={null} onCancel={closerefresh}>
          <img src={imgUrl} width="300px"></img>
        </Modal> : null
      }
    </Card>
  )
}

export default connect(({ }) => ({}))(index)