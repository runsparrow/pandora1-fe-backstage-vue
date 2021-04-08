import { useState, useEffect } from 'react'
import { Input, Button, Select } from 'antd'
const { Option } = Select;
const { Search } = Input;

const index = (props) => {
  const { option, value = {}, onChange } = props
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState(option[0].value)


  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...value,
        changedValue
      });
    }
  };

  const onSearchChange = (item) => {
    setInputValue(item)
    triggerChange({ column: selectValue, value: item })
  }

  return (
    <Input.Group size="small" compact>
      <Select size="small" defaultValue={option[0].value} style={{ width: '120px' }} value={selectValue} onChange={res => setSelectValue(res)}>
        {
          option.map((p, index) => <Option key={index} value={p.value}>{p.label}</Option>)
        }
      </Select>
      <Search size="small" style={{ width: '250px' }} enterButton allowClear value={inputValue} onChange={e => onSearchChange(e.target.value)} onSearch={e => onSearchChange(e.target.value)} />
    </Input.Group>
  )
}

export default index