import { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Tree, Input } from 'antd'
import { connect } from 'dva'
import NavTree from './components/tree'
import './index.less'
import tree from './models/tree';
import { gettreelist } from '@utils/utils'


const index = (props) => {
  const { dispatch } = props
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    getnavtree()
    return () => {
    }
  }, [])

  const getnavtree = () => {
    dispatch({
      type: "navTree/getnavtree",
      payload: { id: "-1" }
    }).then(res => {
      setTreeData(gettreelist(res))
    })
  }

  const getNavList = () => {
    getnavtree()
  }

  return (
    <PageContainer>
      <div className="body">
        <Card className="card-tree" title="菜单树">
          <NavTree treeData={treeData} getNavList={getNavList}></NavTree>
        </Card>
        <Card className="card-table" title="菜单详情">
        </Card>
      </div>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)