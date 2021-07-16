import { useState, useEffect, useRef } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Modal } from 'antd'
import { PushpinFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import ReactPlayer from 'react-player'
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
  const [info, setInfo] = useState(null)
  const [column, setColumn] = useState([
    {
      title: "素材编号",
      dataIndex: "goodsNo",
      width: 200,
    },
    {
      title: "素材名称",
      dataIndex: "name",
      width: 200
    },
    {
      title: "标签",
      dataIndex: "tags",
      search: false,
      width: 200
    },
    {
      title: "描述",
      dataIndex: "desc",
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
      search: false,
      width: 200,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => openReview(item)}>审核</a>
      </div>
    },
  ])

  const openReview = (item) => {
    setInfo(item)
    setIsShow(true)
  }

  const review = (item, type) => {
    if (type == 1) {
      dispatch({
        type: "material/review",
        payload: { entity: { id: item.id }, statusKey: "cms.goods.pass" }
      }).then(res => {
        closerefresh()
      })
    } else {
      dispatch({
        type: "material/review",
        payload: { entity: { id: item.id }, statusKey: "cms.goods.close" }
      }).then(res => {
        closerefresh()
      })
    }
  }

  const getList = (page = { pageNum: 1, pageSize: 20 }) => {
    const { goodsNo, name } = page
    let keyword = ""
    if (goodsNo)
      keyword += `^goodsNo=${goodsNo}`
    if (name)
      keyword += `^name=${name}`

    let params = {
      keyWord: keyword,
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: [1]
    }
    return dispatch({
      type: "authority/getGoodsList",
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
    setInfo(null)
    setSelectedRow([])
    uTable.current.getFresh()
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
        toolButtonList={null}
        onSelectedRowsChange={onSelectedRowsChange}
        column={column}
        scroll={scroll}
        isSearch
        rowKey="id" />
      {
        isShow ? <Modal
          title="审核"
          visible={true}
          onCancel={() => closerefresh()}
          footer={<div>
            <Button style={{ marginRight: "10px" }} onClick={() => review(info, 0)}>审核不通过</Button>
            <Button type="primary" onClick={() => review(info, 1)}>审核通过</Button>
          </div>}
        >
          <div>
            {
              info.isImage?<img src={info.fullUrl} style={{ width: "100%" }} />:
              <ReactPlayer width="100%" url={info.fullUrl} controls={true} />
            }
            
            <div>
              是否审核通过？
            </div>
          </div>
        </Modal> : null
      }
    </Card>
  )
}

export default connect(({ }) => ({}))(index)