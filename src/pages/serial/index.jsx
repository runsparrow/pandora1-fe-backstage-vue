import { useState, useEffect, useRef } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider } from 'antd'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
const { Option } = Select

const index = (props) => {
  const { dispatch } = props
  const uTable = useRef()
  const [selectedRow, setSelectedRow] = useState([])
  const [scroll, setScroll] = useState({ x: "1000px" })
  const [column, setColumn] = useState([
    {
      title: "流水号",
      dataIndex: "serialNo",
      width: 200,
    },
    {
      title: "商户订单号",
      dataIndex: "orderNo",
      search: false,
      width: 200
    },
    {
      title: "付款人ID",
      dataIndex: "payerId",
      search: false,
      width: 200
    },
    {
      title: "付款人账号",
      dataIndex: "payerAccount",
      search: false,
      width: 200
    },
    {
      title: "交易时间",
      dataIndex: "dealDateTime",
      search: false,
      width: 200
    },
    {
      title: "交易金额",
      dataIndex: "dealAmount",
      search: false,
      width: 200
    }
  ])


  const getList = (page = { pageNum: 0, pageSize: 20 }) => {
    const { serialNo } = page
    let keyword = ""
    if (serialNo)
      keyword += `^serialNo=${serialNo}`

    let params = {
      keyWord: keyword,
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: [0]
    }
    return dispatch({
      type: "serial/getList",
      payload: params
    }).then(res => {
      return res
    })
  }

  const onSelectedRowsChange = (item) => {
    setSelectedRow(item)
  }

  const closerefresh = () => {
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