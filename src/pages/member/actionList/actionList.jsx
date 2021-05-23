import { useState, useEffect } from 'react'
import { Card, Table, Button, Select, message } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import NewMember from '../newMember'
import { PlusOutlined } from '@ant-design/icons'

const index = ({ selectedRow, type, closerefresh }) => {
  const [isShow, setIsShow] = useState(false)

  const add = () => {
    setIsShow(true)
  }

  const close = () => {
    setIsShow(false)
    closerefresh()
  }

  return (
    <div className="titlebt">
      <Button type="primary" onClick={add}>
        <PlusOutlined />新建会员
      </Button>
      {
        isShow ? <NewMember isNew={true} close={close} /> : null
      }
    </div>)
}

export default connect(({ }) => ({}))(index)