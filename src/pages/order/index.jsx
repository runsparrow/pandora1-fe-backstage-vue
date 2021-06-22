import { useState, useEffect } from 'react'
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
      title: "订单编号",
      dataIndex: "orderNo",
      width: 200,
    },
    {
      title: "总价",
      dataIndex: "totalPrice",
      search: false,
      width: 200
    },
    {
      title: "买家名称",
      dataIndex: "buyerName",
      search: false,
      width: 200
    },
    {
      title: "支付方式",
      dataIndex: "payMode",
      search: false,
      width: 200
    },
    {
      title: "支付流水",
      dataIndex: "serialNo",
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
      title: "创建时间",
      dataIndex: "createDateTime",
      search: false,
      width: 200
    },
    {
      title: "下单时间",
      dataIndex: "orderDateTime",
      search: false,
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => closeOrder(item)}>关闭订单</a>
      </div>
    },
  ])


  const getList = (page = { pageNum: 1, pageSize: 20 }) => {
    const { orderNo } = page
    let keyword = ""
    if (orderNo)
      keyword += `^orderNo=${orderNo}`

    let params = {
      keyWord: keyword,
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: []
    }
    return dispatch({
      type: "order/getList",
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