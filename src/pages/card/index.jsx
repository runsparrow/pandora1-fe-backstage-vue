import { useState, useEffect, useRef } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Modal } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
import ActionList from './actionList/actionList'
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
      title: "卡号",
      dataIndex: "cardNo",
    },
    {
      title: "密码",
      dataIndex: "cardPassword",
      search: false,
    },
    {
      title: "有效天数",
      dataIndex: "daysLimit",
      search: false,
    },
    {
      title: "状态",
      dataIndex: "statusName",
      search: false,
    },
    {
      title: "是否已激活",
      dataIndex: "isActivate",
      valueEnum: {
        true: { text: '是' },
        false: { text: '否' },
      },
    },
    {
      title: "激活人姓名",
      dataIndex: "activateMemberName",
      search: false,
    },
  ])

  const getList = (page = { pageNum: 1, pageSize: 20 }) => {
    const { isActivate, cardNo } = page
    let params = {
      keyWord: `${isActivate ? `^isActivate=${isActivate}` : ""}${cardNo ? `^cardNo=${cardNo}` : ""}`,
      page: `${page.pageNum}^${page.pageSize}`,
      date: "",
      sort: ""
    }
    return dispatch({
      type: "card/getList",
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
          toolButtonList={<ActionList selectedRows={selectedRow} type="res1" closerefresh={closerefresh} />}
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