import { useState, useEffect } from 'react'
import { Card, Table, Button, Select } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import { PlusOutlined } from '@ant-design/icons'

const index = ({ selectedRow }) => {

  const gotonew = () => {
    history.push("/article/new")
  }

  return (
    <div className="titlebt">
      <Button type="primary" onClick={gotonew}>
        <PlusOutlined />批量关闭订单
      </Button>
    </div>)
}

export default connect(({ }) => ({}))(index)