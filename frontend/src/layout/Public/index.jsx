import { Content, Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import Footer from '../Footer'
import { Link, Outlet } from 'react-router-dom'
import NavHeader from '../NavHeader'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  ProjectOutlined,
  DollarOutlined,
  MailOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
const { Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}
const items = [
  getItem('Ý tưởng sáng tạo', 'innovation', <BulbOutlined />, [
    getItem(<Link to='/innovator/idea'>Tạo mới ý tưởng</Link>, 'create'),
    getItem(<Link to='/innovator'>Ý tưởng của tôi</Link>, 'ideaList'),
    getItem(<Link to='/match-idea'>Kết nối ý tưởng</Link>, 'ideaDetail'),
  ]),
  getItem('Triển khai cuộc thi', 'contest', <ProjectOutlined />, [
    getItem(<Link to='/contest'>Các cuộc thi </Link>, 'contest'), 
    getItem(<Link to='/contest/new'>Tạo cuộc thi</Link>, 'mySubmission'),
    getItem(<Link to='/:contestId'>Danh sách dự thi</Link>, 'submissionList'),
  ]),
  getItem('Kêu gọi tài trợ', 'sponsor', <DollarOutlined />, [
    getItem(<Link to='/sponsor/projects'>Tạo mới kêu gọi</Link>, 'createSponsor'),
    getItem(<Link to='/sponsor/projects'>Dự án kêu gọi của tôi</Link>, 'sponsorDetail'),
  ]), 
  getItem(<Link to='/email'>Liên hệ</Link>, 'email', <MailOutlined />),
]

const PublicLayout = (props) => {
  // const {user, logout} = useAuth()
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          zIndex: 100,
        }}
      >
        <div
          className='navbtn-container'
          style={{
            position: 'fixed',
            zIndex: 1,
            height: '100vh',
            width: collapsed ? '80px' : '256px',
            background: colorBgContainer,
            transition: 'width 0.2s',
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              margin: 0,
              width: '100%',
              background: colorBgContainer,
            }}
          />
          <Menu mode="inline" items={items} />
        </div>
      </Sider>
      <Layout>
        <NavHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default PublicLayout
