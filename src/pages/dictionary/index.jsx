import { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Tree, Input } from 'antd'
import { connect } from 'dva'
import NavTree from './components/tree'
import SelectForm from './components/selectForm'
import { gettreelist } from '@utils/utils'
import './index.less'


const index = (props) => {
  const { dispatch } = props
  const [treeData, setTreeData] = useState([])
  const [info, setInfo] = useState({})

  useEffect(() => {
    getnavtree()
    return () => {
    }
  }, [])

  const getnavtree = () => {
    dispatch({
      type: "dictionary/getstatustree",
      payload: { id: "-1" }
    }).then(res => {
      setTreeData(gettreelist(res))
    })
  }

  const getNavList = () => {
    getnavtree()
  }

  const selectNode = (item) => {
    setInfo(item)
  }

  return (
    <PageContainer>
      <div className="body">
        <Card className="card-tree" title="状态树">
          <NavTree treeData={treeData} selectNode={selectNode} getNavList={getNavList}></NavTree>
        </Card>
        <Card className="card-table" title="状态详情">
          <SelectForm info={info} refresh={getnavtree} />
        </Card>
      </div>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)