import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd'
import Material from './material/index'
import User from './user/index'
const { TabPane } = Tabs;

const index = () => {
  const [tabkey, setTabkey] = useState("1")

  return (
    <PageContainer title=" "
      tabList={[{ key: "1", tab: "会员审核" }, { key: "2", tab: "素材上传审核" }]}
      tabActiveKey={tabkey}
      onTabChange={(key) => setTabkey(key)}
    >
      {
        tabkey == "1" ? <User /> : <Material />
      }
    </PageContainer>
  )
}

export default index