import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider } from 'antd'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
import ActionList from './actionList/actionList'
const { Option } = Select

const index = (props) => {
  const { dispatch } = props
  const [scroll, setScroll] = useState({ x: "2400px" })
  const [data, setData] = useState({})
  const [queryList, setQueryList] = useState([
    { label: "字段筛选", value: "a", type: "searchinput", option: [{ label: "bbb", value: "qq" }, { label: "ccc", value: "dddd" }] },
    { label: "客户来源", value: "b", type: "checkboxgroup", option: [{ label: "bbb", value: "qq" }, { label: "ccc", value: "dddd" }] },
    { label: "创建时间", value: "d", type: "rangdatepicker", option: [] },
    { label: "最后跟进时间", value: "f", type: "rangdatepicker", option: [] },
    { label: "负责销售", value: "g", type: "searchselect", option: [{ label: "bbb", value: "qq" }, { label: "ccc", value: "dddd" }] },
  ])
  const [queryString, setQueryString] = useState({})
  const [column, setColumn] = useState([
    {
      title: "客户ID",
      dataIndex: "a",
      width: 200,
    },
    {
      title: "锁定客户",
      dataIndex: "a",
      width: 200
    },
    {
      title: "客户来源",
      dataIndex: "a",
      width: 200
    },
    {
      title: "客户类型",
      dataIndex: "a",
      width: 200
    },
    {
      title: "客户名称",
      dataIndex: "a",
      width: 200
    },
    {
      title: "需求",
      dataIndex: "a",
      width: 200
    },
    {
      title: "所在地区",
      dataIndex: "a",
      width: 200
    },
    {
      title: "所在行业",
      dataIndex: "a",
      width: 200
    },
    {
      title: "联系人",
      dataIndex: "a",
      width: 200
    },
    {
      title: "联系电话",
      dataIndex: "a",
      width: 200
    },
    {
      title: "去年累计到款",
      dataIndex: "a",
      width: 200
    },
    {
      title: "今年累计到款",
      dataIndex: "a",
      width: 200
    },
    {
      title: "合同次数",
      dataIndex: "a",
      width: 200
    },
    {
      title: "成单总金额",
      dataIndex: "a",
      width: 200
    },
    {
      title: "资源对接人",
      dataIndex: "a",
      width: 200
    },
    {
      title: "负责销售",
      dataIndex: "a",
      width: 200
    },
    {
      title: "负责售后",
      dataIndex: "a",
      width: 200
    },
    {
      title: "创建时间",
      dataIndex: "a",
      width: 200
    },
    {
      title: "最后跟进时间",
      dataIndex: "a",
      width: 200
    },
    {
      title: "掉保时间",
      dataIndex: "a",
      width: 200
    },
    {
      title: "掉保时间",
      dataIndex: "a",
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      width: 500,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => viewInfo(item)}>详情</a>
        <Divider type="vertical" />
        <a onClick={() => edit(item)}>编辑</a>
      </div>
    },
  ])

  const onQueryForm = (item) => {
    setQueryString({ ...queryString, ...item })
  }

  const onFormRest = () => {
    setQueryString({})
  }

  const getList = (item = { pageNum: 0, pageSize: 20 }) => {
    return {
      data: [{ key: 1, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 2, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 3, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 4, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 5, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 6, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 7, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 8, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 9, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 10, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      { key: 11, a: "aaaa123", amount: "bbbb", type: "cccc", note: "dddd" },
      ],
      total: 1000,
      success: true
    }
    // console.log("item", item)
    // item.pageNum = item.current ? item.current - 1 : item.pageNum ?? 0
    // return dispatch({
    //   type: "resources/getList",
    //   payload: item
    // }).then(res => {
    //   console.log("res", res)

    // })
  }
  return (
    <div>
      <Card><QueryForm list={queryList} onQueryForm={onQueryForm} onFormRest={onFormRest}></QueryForm></Card>
      <Card style={{ marginTop: "20px" }}>
        <UniversalTable column={column} scroll={scroll} data={data} getList={getList} type="c1" ActionList={null}></UniversalTable>
      </Card>
    </div>
  )
}

export default connect(({ }) => ({}))(index)