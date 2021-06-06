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
      title: "流水号",
      dataIndex: "serialNo",
      width: 200,
    },
    {
      title: "交易金额",
      dataIndex: "dealAmount",
      search: false,
      width: 200
    },
    {
      title: "交易时间",
      dataIndex: "dealDateTime",
      width: 200
    },
    {
      title: "会员名称",
      dataIndex: "memberName",
      width: 200
    },
    {
      title: "创建时间",
      dataIndex: "createDateTime",
      width: 200
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
      status: []
    }
    return dispatch({
      type: "recharge/getList",
      payload: params
    }).then(res => {
      console.log("res",res)
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