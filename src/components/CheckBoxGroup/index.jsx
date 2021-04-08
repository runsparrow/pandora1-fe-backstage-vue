import { useState, useEffect } from 'react'
import { Tag } from 'antd'
const { CheckableTag } = Tag

const index = (props) => {
  const { option, value = {}, onChange } = props
  const [selectedTags, setSelectedTags] = useState([])

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...value,
        changedValue
      });
    }
  };

  const onCheckChange = (item, checked) => {
    if (checked) {
      let res = [].concat(selectedTags, [item])
      setSelectedTags(res)
      triggerChange(res)
    } else {
      let res = selectedTags.filter(p => p != item)
      setSelectedTags(res)
      triggerChange(res)
    }
  }

  return option.map((p, index) => {
    return <CheckableTag
      key={index}
      checked={selectedTags.indexOf(p.value) > -1}
      onChange={checked => onCheckChange(p.value, checked)}
    >
      {p.label}
    </CheckableTag>
  })
}

export default index