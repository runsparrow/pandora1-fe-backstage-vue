import { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Button, Select, Divider, Tree, Input, Pagination } from 'antd'
import { connect } from 'dva'
import NavTree from './components/tree'
import SelectForm from './components/selectForm'
import { hospitaltree } from '@utils/utils'
import './index.less'


const index = (props) => {
  const { dispatch } = props
  const [treeData, setTreeData] = useState([])
  const [info, setInfo] = useState({})
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    getnavtree()
    return () => {
    }
  }, [])

  const getnavtree = (name = "", page = 1, pageSize = 20) => {
    dispatch({
      type: "hospital/getstatustree",
      payload: {
        keyword: `${name}^pid=-1`,
        page: `${page}^${pageSize}`,
      }
    }).then(res => {
      setPage(page)
      setPageSize(pageSize)
      setTotal(res.total)
      setTreeData(hospitaltree(res.rows))
    })
  }

  const getloaddata = (item) => {
    dispatch({
      type: "hospital/getstatustree",
      payload: {
        keyword: `^pid=${item.key}`,
        page: `${1}^${999}`,
      }
    }).then(res => {
      setTreeData(treeData.map(p => { return { ...p, children: p.id == item.id ? hospitaltree(res.rows) : [] } }))
    })
  }

  const getNavList = () => {
    getnavtree()
  }

  const selectNode = (item) => {
    setInfo(item)
  }

  const pagination = () => {
    return <Pagination
      showSizeChanger
      current={page}
      pageSize={pageSize}
      onChange={onPageChange}
      total={total}
      style={{ marginTop: "20px" }}
    />
  }

  const onPageChange = (page, PageSize) => {
    getnavtree("", page, PageSize)
  }

  const searchInput = () => {
    return <Input.Search style={{ marginBottom: "20px", width: "80%" }} value={searchValue} onChange={onSearchChange} onSearch={onSearch} allowClear />
  }

  const onSearchChange = (e) => {
    setSearchValue(e.target.value)
    if (!e.target.value) {
      getnavtree()
    }
  }

  const onSearch = () => {
    getnavtree(searchValue)
  }

  return (
    <PageContainer>
      <div className="body">
        <Card className="card-tree" title="状态树">
          <NavTree treeData={treeData} searchInput={searchInput} pagination={pagination} getloaddata={getloaddata} selectNode={selectNode} getNavList={getNavList}></NavTree>
        </Card>
        <Card className="card-table" title="状态详情">
          <SelectForm info={info} refresh={() => getnavtree(searchValue, page, pageSize)} />
        </Card>
      </div>
    </PageContainer>
  )
}

export default connect(({ }) => ({}))(index)