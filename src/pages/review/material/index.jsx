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
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      width: 200,
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
          type: "material/review",
          payload: { id: item.id, statusKey: "cms.goods.pass" }
        }).then(res => {
          getList()
        })
      },
      onCancel () {
        dispatch({
          type: "material/review",
          payload: { id: item.id, statusKey: "cms.goods.close" }
        }).then(res => {
          getList()
        })
        getList()
      },
    });
  }

  const getList = (page = { pageNum: 0, pageSize: 20 }, queryString = {}) => {
    page.pageNum = page.current ? page.current : page.pageNum ?? 1
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

  return (
    <Card style={{ marginTop: "20px" }}>
      <UniversalTable column={column} scroll={scroll} isSearch={true} getList={getList} type="c1" ActionList={null}></UniversalTable>
    </Card>
  )
}

export default connect(({ }) => ({}))(index)