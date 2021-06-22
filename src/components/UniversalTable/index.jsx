import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
import { PlusOutlined, EllipsisOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import { components } from '@/components/tableResizable'
import './index.less'

const index = (props) => {
  const { isSearch = false, scroll = { x: "1000px" }, rowKey, column, isSelect = true, tableParams = {}, toolButtonList, request, onSelectedRowsChange, childRef } = props
  const ref = useRef();
  const [columns, setColumns] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useImperativeHandle(childRef, () => ({
    getFresh: () => freshTable()
  }));

  useEffect(() => {
    setColumns(column.map((p, index) => {
      return {
        ...p, onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index),
        })
      }
    }))
    return () => { }
  }, [column])

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...column];

    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };

    setColumns(nextColumns.map((p, index) => {
      return {
        ...p, onHeaderCell: column => ({
          width: column.width,
          onResize: handleResize(index)
        })
      }
    }))
  };

  const freshTable = () => {
    ref.current.clearSelected()
    ref.current.reload()
  }

  const onSelectChange = (item, selectedRows) => {
    setSelectedRowKeys(item)
    onSelectedRowsChange(selectedRows)
  }

  return (
    <ProTable
      actionRef={ref}
      components={components}
      columns={columns}
      request={request}
      params={tableParams}
      bordered
      rowKey={rowKey}
      search={isSearch}
      pagination={{
        pageSize: 20,
        pageSizeOptions: [20, 100, 200, 500],
        size: 'default',
      }}
      headerTitle={toolButtonList}
      scroll={scroll}
      rowSelection={isSelect ? {
        selectedRowKeys,
        onChange: onSelectChange,
      } : false}
    />
  )
}

export default index