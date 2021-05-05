import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider } from 'antd'
import QueryForm from '@components/QueryForm'
import ActionList from './actionList/actionList'
import { connect } from 'dva'
import { history } from 'umi'
const { Option } = Select

const index = (props) => {
  const { dispatch } = props
  const [scroll, setScroll] = useState({ x: "1600" })
  
  const [column, setColumn] = useState([
    {
      title: "标题",
      dataIndex: "title",
      width: 200,
    },
    {
      title: "简介",
      dataIndex: "summary",
      search: false,
      width: 200
    },
    {
      title: "导航名称",
      dataIndex: "navigationName",
      width: 200
    },
    {
      title: "标签",
      dataIndex: "tags",
      width: 200
    },
    {
      title: "文章来源",
      dataIndex: "source",
      search: false,
      search: false,
      width: 200
    },
    {
      title: "文章来源路径",
      dataIndex: "sourceUrl",
      search: false,
      width: 350
    },
    {
      title: "是否显示",
      dataIndex: "isDisplay",
      width: 200
    },
    {
      title: "是否置顶",
      dataIndex: "isTop",
      search: false,
      width: 200
    },
    {
      title: "允许评论",
      dataIndex: "isDiscuss",
      width: 350
    },
    {
      title: "发表人",
      dataIndex: "publisher",
      search: false,
      width: 200
    },
    {
      title: "收藏量",
      dataIndex: "collects",
      search: false,
      width: 200
    },
    {
      title: "转发量",
      dataIndex: "forwards",
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
      title: '操作',
      key: 'action',
      width: 500,
      fixed: "right",
      render: (item) => <div>
        <a onClick={() => checkTop(item)}>置顶</a>
        <Divider type="vertical" />
        <a onClick={() => edit(item)}>编辑</a>
      </div>
    },
  ])

  const edit = (item) => {
    console.log("edit")
  }

  const checkTop = (item) => {
    console.log("checkTop")
  }

  const onFormRest = () => {
    setQueryString({})
  }

  const getList = (page = { pageNum: 1, pageSize: 20 }, queryString = {}) => {
    page.pageNum = page.current ? page.current : page.pageNum ?? 1
    let params = {
      keyWord: "",
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: "",
      status: [0]
    }
    return dispatch({
      type: "article/getList",
      payload: params
    }).then(res => {
      return res
    })
  }

  return (
    <PageContainer title=" ">
      <Card style={{ marginTop: "20px" }}>
        <UniversalTable column={column} scroll={scroll}  getList={getList} isSearch={true} type="c1" ActionList={ActionList}></UniversalTable>
      </Card>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)