import { useState, useEffect } from 'react'
import { Card, Table, Button, Select, message } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import NewUsers from '../newUsers'
import { PlusOutlined } from '@ant-design/icons'

const index = ({ selectedRow, type }) => {
  const [isShow, setIsShow] = useState(false)

  const add = () => {
    setIsShow(true)
  }

  return (
    <div className="titlebt">
      <Button type="primary" onClick={add}>
        <PlusOutlined />新建用户
      </Button>
      {
        isShow ? <NewUsers isNew={true} close={() => setIsShow(false)} /> : null
      }
    </div>)
}

export default connect(({ }) => ({}))(index)