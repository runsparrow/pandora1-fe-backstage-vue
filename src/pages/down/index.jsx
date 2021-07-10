import { useState, useEffect, useRef } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Modal } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
import moment from 'moment';
const { Option } = Select
const { confirm } = Modal;

const index = (props) => {
  const { dispatch } = props
  const uTable = useRef()
  const [selectedRow, setSelectedRow] = useState([])
  const [scroll, setScroll] = useState({ x: "1000px" })
  const [isShow, setIsShow] = useState(false)
  const [info, setInfo] = useState({})
  const [column, setColumn] = useState([
    {
      title: "下载人",
      dataIndex: "memberName",
      search: false,
    },
    {
      title: "素材名",
      dataIndex: "goodsName",
      search: false,
    },
    {
      title: "下载时间",
      dataIndex: "downDateTime",
      search: false
    }
  ])

  const getList = (page = { pageNum: 1, pageSize: 20 }) => {
    let params = {
      keyWord: "",
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: ""
    }
    return dispatch({
      type: "down/getList",
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
  return (
    <PageContainer title=" ">
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
      </Card>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)