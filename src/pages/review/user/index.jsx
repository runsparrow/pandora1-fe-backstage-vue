import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Modal } from 'antd'
import { PushpinFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
const { Option } = Select
const { confirm } = Modal;

const index = (props) => {
  const { dispatch } = props
  const [scroll, setScroll] = useState({ x: "1000px" })
  const [column, setColumn] = useState([
    {
      title: "会员名称",
      dataIndex: "name",
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
      dataIndex: "avatarUrl",
      width: 200,
      search: false,
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: 200
    },
    {
      title: "会员等级",
      dataIndex: "level",
      width: 200
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
        //cms.authority.approver.pass
        dispatch({
          type: "authority/review",
          payload: { id: item.id, statusKey: "cms.authority.approver.pass" }
        }).then(res => {
          getList()
        })
      },
      onCancel () {
        //cms.authority.approver.refuse
        dispatch({
          type: "authority/review",
          payload: { id: item.id, statusKey: "cms.authority.approver.refuse" }
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
      <UniversalTable column={column} scroll={scroll} isSelect={false} isSearch={true} getList={getList} type="c1" ActionList={null}></UniversalTable>
    </Card>
  )
}

export default connect(({ }) => ({}))(index)