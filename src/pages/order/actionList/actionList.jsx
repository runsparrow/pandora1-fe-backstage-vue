import { useState, useEffect } from 'react'
import { Card, Table, Button, Select, message } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'

const index = ({ selectedRow, type }) => {

  const closeOrder = () => {
    if (selectedRow.length < 1) {
      message.error("请先选择订单")
      return
    }
    console.log("selectedRow", selectedRow)
  }

  return (
    <div className="titlebt">
      <Button type="primary" onClick={closeOrder}>
        批量关闭订单
      </Button>
    </div>)
}

export default connect(({ }) => ({}))(index)