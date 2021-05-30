import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Modal } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
import ActionList from './actionList/actionList'
import NewMember from './newMemberPower'
const { Option } = Select
const { confirm } = Modal;

const index = (props) => {
  const { dispatch } = props
  const [scroll, setScroll] = useState({ x: "1000px" })

  const [isShow, setIsShow] = useState(false)
  const [info, setInfo] = useState({})
  const [column, setColumn] = useState([
    {
      title: "套餐名称",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "价格",
      dataIndex: "price",
      search: false,
      width: 200,
      search: false,
    },
    {
      title: "有效期天数限制",
      dataIndex: "daysLimit",
      width: 200,
      search: false,
    },
    {
      title: "是否可下载",
      dataIndex: "isDown",
      width: 200,
      rrender: res => {
        return res ? "是" : "否"
      },
      search: false,
    },
    {
      title: "下载限制",
      dataIndex: "downLimit",
      width: 200
    },
    {
      title: "是否可上传",
      dataIndex: "isUpload",
      width: 200,
      rrender: res => {
        return res ? "是" : "否"
      },
      search: false,
    },
    {
      title: "上传限制",
      dataIndex: "uploadLimit",
      search: false,
      width: 200
    },
    {
      title: "是否可购买",
      dataIndex: "isBuy",
      width: 200,
      rrender: res => {
        return res ? "是" : "否"
      },
      search: false,
    },
    {
      title: "购买限制",
      dataIndex: "buyLimit",
      width: 200,
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      search: false,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => edit(item)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => del(item)}>删除</a>
      </div>
    },
  ])



  const del = (item) => {
    confirm({
      title: '删除操作',
      icon: <DeleteFilled />,
      content: '是否要删除该条信息？',
      okText: "确定",
      cancelText: "取消",
      onOk () {
        dispatch({
          type: "memberpower/del",
          payload: { id: item.id }
        }).then(res => {
          getList()
        })
      },
      onCancel () {
        getList()
      },
    });
  }

  const close = () => {
    setIsShow(false)
    getList()
  }

  const edit = (item) => {
    setInfo(item)
    setIsShow(true)
  }

  const getList = (page = { pageNum: 1, pageSize: 20 }, queryString = {}) => {
    page.pageNum = page.current ? page.current : page.pageNum ?? 1
    let params = {
      keyWord: "",
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: ""
    }
    return dispatch({
      type: "memberpower/getList",
      payload: params
    }).then(res => {
      return res
    })
  }
  return (
    <PageContainer title=" ">
      <Card style={{ marginTop: "20px" }}>
        <UniversalTable column={column} scroll={scroll} isSearch={true} getList={getList} type="c1" isSelect={false} ActionList={ActionList}></UniversalTable>
      </Card>
      {
        isShow ? <NewMember close={close} isNew={false} info={info} /> : null
      }
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)