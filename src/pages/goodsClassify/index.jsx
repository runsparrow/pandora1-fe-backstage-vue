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
      type: "dictionary/getGoodsTree",
      payload: { key: "cms.goods.classify" }
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
        <Card className="card-tree" title="商品分类树">
          <NavTree treeData={treeData} selectNode={selectNode} getNavList={getNavList}></NavTree>
        </Card>
        <Card className="card-table" title="商品分类详情">
          <SelectForm info={info} />
        </Card>
      </div>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)