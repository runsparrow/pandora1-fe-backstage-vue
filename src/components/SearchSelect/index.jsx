import { useState, useEffect } from 'react'
import { Select } from 'antd'

const index = (props) => {
  const { option, value, onChange } = props

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...value,
        changedValue
      });
    }
  };

  const onSelectChange = (value) => {
    triggerChange(value)
  }

  return (
    <Select
      showSearch
      size="small"
      style={{ width: 150 }}
      optionFilterProp="children"
      onChange={onSelectChange}
    >
      {
        option.map((p, index) => <Option key={index} value={p.value}>{p.label}</Option>)
      }
    </Select>
  )
}
export default index