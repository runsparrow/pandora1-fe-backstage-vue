import { useState, useEffect } from 'react'
import { Card, Table, Button, Select } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'

const index = ({ selectedRow, type }) => {
  console.log("actionList-selectedRow", selectedRow)


  return (
    <div className="titlebt">
      <Button type="primary">
        新增订单
      </Button>
    </div>)
}

export default connect(({ }) => ({}))(index)