import { useState, useEffect } from 'react'
import UniversalTable from '@components/UniversalTable'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Form, message } from 'antd'
import Queryform from './queryform'
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
  const [queryString, setQueryString] = useState({})

  useEffect(() => {
    getmaterialList()
    return () => { }
  }, [])

  const getmaterialList = (page = { pageNum: 1, pageSize: 20 }, queryString = { name: "", classifyId: null, tags: "" }, isImage = true) => {
    let c = queryString["classifyId"] || ""
    let t = queryString["tags"] || ""
    let n = queryString["name"] || ""
    dispatch({
      type: "material/getList",
      payload: {
        keyWord: `${n}^isImage=${isImage}^classifyId=${c}^tags=${t}`,
        page: `${page.pageNum}^${page.pageSize}`,
        date: "",
        sort: "",
        status: []
      }
    }).then(res => {
      if (List.length > 0) {
        if (page.pageNum == 1) {
          setList(res)
        } else {
          setList([].concat(List, res))
        }
      }
      else
        setList(res)
    })
  }

  const changeTabs = (key) => {
    setTabkey(key)
    if (key == 1) {
      getmaterialList({ pageNum: 1, pageSize: 20 }, {}, true)
    } else {
      getmaterialList({ pageNum: 1, pageSize: 20 }, {}, false)
    }
  }

  const getscrollbarheight = (e) => {
    if (List.length > 0) {
      if (countList.length == 0) {
        setCountList([{ number: 1, height: 0 }])
      }
      else {
        let count = scrollHeight
        let materialList = document.getElementById("materialList")
        if (materialList.offsetHeight - (e.target.scrollHeight - e.target.scrollTop) > 1) {
          if (!countList.some(p => p.height == e.target.scrollHeight)) {
            getmaterialList({ pageNum: count + 1, pageSize: 20 })
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
    getmaterialList()
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

  const resetform = () => {
    setQueryString({})
    if (tabkey == 1)
      getmaterialList({ pageNum: 1, pageSize: 20 }, {}, true)
    else
      getmaterialList({ pageNum: 1, pageSize: 20 }, {}, false)
  }

  const formquery = (query) => {
    setQueryString(query)
    if (tabkey == 1)
      getmaterialList({ pageNum: 1, pageSize: 20 }, query, true)
    else
      getmaterialList({ pageNum: 1, pageSize: 20 }, query, false)
  }


  const batchDel = () => {
    if (selectItem.length < 1) {
      message.error("请先选择素材")
      return
    }
    dispatch({
      type: "material/batchDel",
      payload: selectItem
    }).then(res => {
      setList([])
      getmaterialList()
    })
  }

  return (
    <PageContainer title=" "
      tabList={[{ key: "1", tab: "图片" }, { key: "2", tab: "视频" }]}
      tabActiveKey={tabkey}
      onTabChange={changeTabs}>
      <Card bodyStyle={{ padding: "20px" }}>
        <Queryform formquery={formquery} resetform={resetform} />
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
    </PageContainer >
  )
}

export default connect(({ }) => ({}))(index)