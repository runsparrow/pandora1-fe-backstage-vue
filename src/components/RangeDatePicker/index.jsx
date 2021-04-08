import { useState, useEffect } from 'react'
import { Radio, DatePicker, Space } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;

const list = [{ label: "今天", value: "a" }, { label: "昨天", value: "b" }, { label: "最近7天", value: "c" }]
const index = (props) => {
  const { value = [], onChange } = props
  const [radioValue, setRadioValue] = useState("")
  const [rangDateValue, setRangDateValue] = useState([])

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...value,
        changedValue
      });
    }
  };

  const onRadioChange = (e) => {
    let type = e.target.value
    setRadioValue(type)
    let res = []
    switch (type) {
      case "a":
        res = [moment(), moment()]
        break;
      case "b":
        res = [moment().add(-1, 'd'), moment()]
        break;
      case "c":
        res = [moment().add(-6, 'd'), moment()]
        break;
    }
    setRangDateValue(res)
    triggerChange(res)
  }

  const onDatePickerChange = (item) => {
    if (item[1].format("YYYY-MM-DD") != moment().format("YYYY-MM-DD")) {
      setRadioValue("")
    } else {
      if ([moment().format("YYYY-MM-DD"), moment().add(-1, 'd').format("YYYY-MM-DD"), moment().add(-6, 'd').format("YYYY-MM-DD")].some(x => x == item[0].format("YYYY-MM-DD"))) {
        if (item[0].format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
          setRadioValue("a")
        } else if (item[0].format("YYYY-MM-DD") == moment().add(-1, 'd').format("YYYY-MM-DD")) {
          setRadioValue("b")
        } else if (item[0].format("YYYY-MM-DD") == moment().add(-6, 'd').format("YYYY-MM-DD")) {
          setRadioValue("c")
        }
      } else {
        setRadioValue("")
      }
    }
    setRangDateValue(item)
  }

  //从今天算起前7天
  return (
    <div style={{ display: "flex" }}>
      <Radio.Group size="small" onChange={onRadioChange} value={radioValue} style={{ marginRight: '10px' }}>
        {
          list.map((p, index) => <Radio.Button key={index} value={p.value}>{p.label}</Radio.Button>)
        }
      </Radio.Group>
      <RangePicker size="small" value={rangDateValue} placeholder={["开始日期", "结束日期"]} onChange={onDatePickerChange} />
    </div>
  )
}

export default index