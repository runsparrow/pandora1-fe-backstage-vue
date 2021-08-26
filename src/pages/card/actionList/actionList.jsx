import { useState, useEffect } from 'react'
import { Card, Table, Button, Select, message } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import BatchCard from '../batchCard'
import { PlusOutlined, ExportOutlined } from '@ant-design/icons'
import { exportExcel } from '@utils/excel'


const index = ({ selectedRows = [], type, closerefresh }) => {
  const [isShow, setIsShow] = useState(false)

  const add = () => {
    setIsShow(true)
  }

  const close = () => {
    setIsShow(false)
    closerefresh()
  }

  const exportExcelFile = () => {
    if (selectedRows.length <= 0) {
      message.error('请先选择要导出的数据');
      return true
    }
    let header = [{
      title: "卡号",
      dataIndex: "cardNo",
      key: "cardNo",
    },
    {
      title: "密码",
      dataIndex: "cardPassword",
      key: "cardPassword"
    },
    {
      title: "有效天数",
      dataIndex: "daysLimit",
      key: "daysLimit"
    },
    {
      title: "状态",
      dataIndex: "statusName",
      key: "statusName"
    },
    {
      title: "是否已激活",
      dataIndex: "isActivate",
      key: "isActivate"
    },
    {
      title: "激活人姓名",
      dataIndex: "activateMemberName",
      key: "activateMemberName"
    }]
    exportExcel(header, selectedRows, "开卡导出数据.xlsx")
  }

  return (
    <div className="titlebt">
      <Button type="primary" onClick={add}>
        <PlusOutlined />批量开卡
      </Button>
      <Button type="primary" onClick={exportExcelFile}>
        <ExportOutlined />数据导出
      </Button>
      {
        isShow ? <BatchCard close={close} /> : null
      }
    </div >)
}

export default connect(({ }) => ({}))(index)