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
      width: 200
    },
    {
      title: "支付方式",
      dataIndex: "payMode",
      width: 200
    },
    {
      title: "支付流水",
      dataIndex: "serialNo",
      width: 200
    },
    {
      title: "状态",
      dataIndex: "statusName",
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

  const closeOrder = () => {

  }

  const getList = (page = { pageNum: 0, pageSize: 20 }, queryString = {}) => {
    page.pageNum = page.current ? page.current : page.pageNum ?? 1
    let params = {
      keyWord: "",
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: [0]
    }
    return dispatch({
      type: "order/getList",
      payload: params
    }).then(res => {
      return res
    })
  }
  return (
    <PageContainer title=" ">
      <Card style={{ marginTop: "20px" }}>
        <UniversalTable column={column} scroll={scroll} isSelect={false} isSearch={true} getList={getList} type="c1" ActionList={null}></UniversalTable>
      </Card>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)