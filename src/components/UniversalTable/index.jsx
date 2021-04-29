import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, EllipsisOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import { components, handleResize } from '@/components/tableResizable'
import './index.less'

const index = (props) => {
  const { getList, ActionList, type, isSearch = false, scroll = { x: "1000px" }, rowKey, column, refreshTable, isSelect = true } = props
  const ref = useRef();
  const [selectedRow, setSelectedRow] = useState([])
  const [columns, setColumns] = useState([])

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

  const closerefresh = () => {
    setSelectedRow([])
    ref.current.clearSelected()
    refreshTable()
  }

  return (
    <ProTable
      actionRef={ref}
      components={components}
      columns={columns}
      request={async (params = {}) => {
        return getList(params)
      }}
      bordered
      rowKey={rowKey}
      search={isSearch}
      pagination={{
        pageSize: 20,
        size: 'default',
      }}
      toolbar={{
        title: (ActionList ? <ActionList selectedRow={selectedRow} type={type} closerefresh={closerefresh} /> : null)
      }}
      scroll={scroll}
      rowSelection={isSelect ? {
        onChange: (_, selectedRows) => {
          setSelectedRow(selectedRows)
        }
      } : false}
    />
  )
}

export default index