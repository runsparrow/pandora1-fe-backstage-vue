import { useState, useEffect, useImperativeHandle } from 'react'
import { Card, Modal, Tooltip, Checkbox } from 'antd'
import ReactPlayer from 'react-player'
import newface from '@assets/new.png'
import styles from './index.less'
import nodata from '@assets/nodata.png'
import play from '@assets/play.png'


const index = ({ List, getSelectItem, tabkey, childRef }) => {
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState({})
  const [selectItem, setSelectItem] = useState([])

  useEffect(() => {
    setSelectItem([])
    getSelectItem([])
  }, [tabkey])

  const materialClick = (item) => {
    setInfo(item)
    setVisible(true)
  }

  useImperativeHandle(childRef, () => ({
    clearList: () => setSelectItem([])
  }));


  const onCheckChange = (e, item) => {
    item.check = e.target.checked
    if (e.target.checked) {
      let res = [].concat(selectItem, item)
      setSelectItem(res)
      getSelectItem(res)
    } else {
      setSelectItem(selectItem.filter(p => p.id != item.id))
      getSelectItem(selectItem.filter(p => p.id != item.id))
    }
  }

  const clickCard = (item) => {
    item.check = !item.check
    if (!item.check) {
      let res = [].concat(selectItem, item)
      setSelectItem(res)
      getSelectItem(res)
    } else {
      setSelectItem(selectItem.filter(p => p.id != item.id))
      getSelectItem(selectItem.filter(p => p.id != item.id))
    }
  }

  return (
    <div className={styles.piclistflex}>
      {
        List.length > 0 ? List.map((p, index) =>
          <Card hoverable bodyStyle={{ padding: "10px", height: "300px", }} onClick={() => clickCard(p)} style={{ width: "220px", margin: "5px 0 0 0", border: p.check ? "2px solid #aaaaaa" : null }} key={index}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <Checkbox onChange={(e) => onCheckChange(e, p)} checked={p.check} />
              {
                p.statusValue == 0 ? <img width="20px" height="20px" src={newface}></img> : null
              }
            </div>
            <div style={{ height: "16em", border: "1px solid #eeeeee" }}>
              {
                p.isImage ? <img onClick={() => materialClick(p)} src={p.fullUrl} style={{ width: "100%", height: "100%" }}></img> :
                  // <ReactPlayer width="100%" pip url={info.fullUrl} controls={true} />
                  <img onClick={() => materialClick(p)} src={play} style={{ width: "100%", height: "100%" }}></img>
              }

            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <div style={{ textAlign: "left" }}>{p.name.length > 15 ? <Tooltip title={p.name}>{p.name.slice(0, 15)}...</Tooltip> : p.name}</div>
            </div>
          </Card>) : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><img src={nodata}></img></div>
      }
      <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
      {
        visible ? <Modal
          title='预览大图'
          width={info.isImage ? '50%' : "30%"}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}>
          {
            info.isImage ? <div style={{ width: "100%" }}>
              <p><b>{info.filename}</b></p>
              <img style={{ width: "100%" }} src={info.fullUrl}></img>
            </div> : <ReactPlayer width="100%" url={info.fullUrl} controls={true} />
          }

        </Modal>
          : null
      }
    </div>
  )
}

export default index