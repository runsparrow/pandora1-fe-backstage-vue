import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Form, message } from 'antd'
import QueryForm from '@components/QueryForm'
import { connect } from 'dva'
import { history } from 'umi'
import MaterialList from './materialList'
import BigUpload from './bigUpload'
import EditList from './editList'

const index = ({ dispatch }) => {
  const [tabkey, setTabkey] = useState("1")
  const [List, setList] = useState([])
  const [countList, setCountList] = useState([])
  const [scrollHeight, setScrollHeight] = useState(1)
  const [totalList, setTotalList] = useState([])
  const [visible, setVisible] = useState(false)
  const [uploadVisible, setUploadVisible] = useState(false)
  const [selectItem, setSelectItem] = useState([])

  useEffect(() => {
    getmaterialList()
    return () => { }
  }, [])

  useEffect(() => {
    console.log("selectItem", selectItem)
    return () => { }
  }, [selectItem])

  const getmaterialList = (page = { pageNum: 1, pageSize: 20 }, queryString = {}) => {
    dispatch({
      type: "material/getList",
      payload: {
        keyWord: "",
        page: `${page.pageNum}^${page.pageSize}`,
        date: "",
        sort: "",
        status: []
      }
    }).then(res => {
      console.log("getList", res)
      setList(res)
    })

  }

  const getscrollbarheight = (e) => {
    console.log('aaaa')
    if (List.length > 0) {
      if (countList.length == 0) {
        setCountList([{ number: 1, height: 0 }])
      }
      else {
        let count = scrollHeight
        let materialList = document.getElementById("materialList")
        if (materialList.offsetHeight - (e.target.scrollHeight - e.target.scrollTop) > 1) {
          if (!countList.some(p => p.height == e.target.scrollHeight)) {
            getmaterialList({ page: count + 1 })
            setCountList([].concat(countList, { number: count + 1, height: e.target.scrollHeight }))
            setScrollHeight(count + 1)
          }
        }
      }
    }
  }

  const getpicheight = () => {
    let materialList = document.getElementById("materialList")
    if (materialList) {
      let pch = document.body.clientHeight - materialList.getBoundingClientRect().top - 90;
      return pch + "px"
    }
  }

  const onClose = () => {
    setVisible(false)
    setUploadVisible(false)
  }

  const batchExport = () => {
    setUploadVisible(true)
  }

  const batchEdit = () => {
    if (selectItem.length < 1) {
      message.error("请先选择素材")
      return
    }
    setVisible(true)
  }

  const batchDel = () => {
    if (selectItem.length < 1) {
      message.error("请先选择素材")
      return
    }
    dispatch({
      type: "material/batchDel",
      payload: selectItem
    })
  }

  return (
    <PageContainer title=" "
      tabList={[{ key: "1", tab: "图片" }, { key: "2", tab: "视频" }]}
      tabActiveKey={tabkey}
      onTabChange={(key) => setTabkey(key)}>
      <Card bodyStyle={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Button style={{ marginRight: "10px" }} type="primary" onClick={batchExport}>批量导入</Button>
          <Button style={{ marginRight: "10px" }} type="primary" onClick={batchEdit}>批量编辑</Button>
          <Button style={{ marginRight: "10px" }} type="primary" onClick={batchDel}>批量删除</Button>
        </div>
        <div id="materialList"
          onScroll={getscrollbarheight}
          style={{ overflowY: "auto", height: getpicheight(), border: "1px solid #eeeeee" }}>
          <MaterialList List={List} getSelectItem={(value) => setSelectItem(value)} />
        </div>
      </Card>
      {
        visible ? <EditList onClose={onClose} List={selectItem} /> : null
      }
      {
        uploadVisible ? <BigUpload onClose={onClose} /> : null
      }
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)