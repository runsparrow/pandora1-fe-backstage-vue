import { useState, useEffect } from 'react'
import { Card, Modal, Tooltip, Checkbox } from 'antd'
import newface from '@assets/new.png'
import styles from './index.less'
import nodata from '@assets/nodata.png'


const index = ({ List, getSelectItem }) => {
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState({})
  const [selectItem, setSelectItem] = useState([])

  const materialClick = (item) => {
    setInfo(item)
    setVisible(true)
  }

  const onCheckChange = (e, item) => {
    if (e.target.checked) {
      setSelectItem([].concat(selectItem, item))
      getSelectItem([].concat(selectItem, item))
    } else {
      setSelectItem(selectItem.filter(p => p != item))
      getSelectItem(selectItem.filter(p => p != item))
    }
  }

  return (
    <div className={styles.piclistflex}>
      {
        List.length > 0 ? List.map((p, index) =>
          <Card hoverable bodyStyle={{ padding: "10px", height: "300px", }} style={{ width: "220px", margin: "5px 0 0 0" }} key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <Checkbox onChange={(e) => onCheckChange(e, p)} />
              {
                p.statusValue == 0 ? <img width="20px" height="20px" src={newface}></img> : null
              }
            </div>
            <div style={{ height: "16em", border: "1px solid #eeeeee" }}><img onClick={() => materialClick(p)} src={p.fullUrl} style={{ width: "100%", height: "100%" }}></img></div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div style={{ textAlign: "left" }}>{p.name.length > 15 ? <Tooltip title={p.name}>{p.name.slice(0, 15)}...</Tooltip> : p.name}</div>
            </div>
          </Card>) : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><img src={nodata}></img></div>
      }
      <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
      {
        visible ? <Modal
          title='预览大图'
          width='50%'
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}>
          <div style={{ width: "100%" }}>
            <p><b>{info.filename}</b></p>
            <img style={{ width: "100%" }} src={info.imageUrl}></img>
          </div>
        </Modal>
          : null
      }
    </div>
  )
}

export default index