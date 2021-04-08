import React, { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Table } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { components, handleResize } from '@/components/tableResizable'
import { divide } from 'lodash';
import './index.less'

export default class index extends React.Component {
  state = {
    selectedRow: [],
    columns: [],
  };

  componentDidMount () {
    const { column } = this.props
    this.setState({ columns: column })
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  render () {
    const { selectedRow } = this.state
    const { getList, ActionList, type, isSearch = false, scroll = { x: "1000px" }, rowKey } = this.props
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    return <ProTable
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
        title: (ActionList ? <ActionList selectedRow={selectedRow} type={type} /> : null)
      }}
      scroll={scroll}
      rowSelection={{
        onChange: (_, selectedRows) => {
          this.setState({ selectedRow: selectedRows })
        },
      }}
    />
  }
}