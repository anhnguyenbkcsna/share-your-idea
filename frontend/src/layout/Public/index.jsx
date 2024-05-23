import { Content, Header } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import Footer from '../Footer'
import { Link, Outlet, useLocation } from 'react-router-dom'
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
import { useEffect } from 'react'
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
    getItem(<Link to='/company'>Tạo yêu cầu</Link>, 'ideaDetail'),
    getItem(<Link to='/company/requirement'>Yêu cầu của tôi</Link>, 'requirementList'),
    getItem(<Link to='/match-idea'>Kết nối ý tưởng</Link>, 'ideaMatch'),
  ]),
  getItem('Triển khai cuộc thi', 'contest', <ProjectOutlined />, [
    getItem(<Link to='/contest'>Các cuộc thi</Link>, 'contest'), 
    getItem(<Link to='/contest/new'>Tạo cuộc thi</Link>, 'mySubmission'),
    getItem(<Link to='/contest/:contestId'>Thông tin cuộc thi</Link>, 'submissionList'),
    getItem(<Link to='/contest/submit'>Bài dự thi</Link>, 'submission'),
    getItem(<Link to='/contest/ideas/:id'>Chi tiết bài dự thi</Link>, 'submissionDescription'),
    getItem(<Link to='/contest/ideas/:id/mark'>Chấm điểm</Link>, 'submissionMark'),
    
  ]),
  getItem('Kêu gọi tài trợ', 'sponsor', <DollarOutlined />, [
    getItem(<Link to='/sponsor'>Kêu gọi tài trợ</Link>, 'sponsor'),
    getItem(<Link to='/sponsor/projects'>Các dự án kêu gọi</Link>, 'createSponsor'),
    getItem(<Link to='/sponsor/projects/:id'>Chi tiết dự án</Link>, 'sponsorDescription'),
    getItem(<Link to='/sponsor/projects/:id/edit'>Chỉnh sửa dự án tài trợ</Link>, 'sponsorDetail'),
  ]), 
  getItem(<Link to='/email'>Liên hệ</Link>, 'email', <MailOutlined />),
]

const styleConfig = {
  contest: {
    backgroundColor: '#f69d3c',
    textColor: 'darkblue'
  },
  innovator: {
    backgroundColor: '#ffde78',
    textColor: 'darkgreen'
  },
  company: {
    backgroundColor: '#ffe2a8',
    textColor: 'darkgreen'
  },
  sponsor: {
    backgroundColor: 'lightcoral',
    textColor: 'darkred'
  },
  email: {
    backgroundColor: '#ffa3d8',
    textColor: 'darkred'
  },
  default: {
    backgroundColor: 'white',
    textColor: 'black'
  }
}

const PublicLayout = (props) => {
  // const {user, logout} = useAuth()
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const currentPath = location.pathname.split('/')[1] ? location.pathname.split('/')[1] : 'default'
  const [colorStyle, setColorStyle] = useState(styleConfig[currentPath])
  // const currentStyle = styleConfig[currentPath] || styleConfig.default

  useEffect(() => {
    const newStyle = styleConfig[currentPath] || styleConfig.default
    setColorStyle(newStyle)
  }, [currentPath])

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          // background: colorStyle,
          zIndex: 100,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
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
              // background: colorStyle,
            }}
          />
          <Menu mode="inline" items={items} />
        </div>
      </Sider>
      <Layout>
        <NavHeader colorBgContainer={colorStyle? colorStyle.backgroundColor: ''} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '',
            color: 'black',
          }}
        >
          <Outlet />
        </Content>
        <Footer colorBgContainer={colorStyle.backgroundColor}/>
      </Layout>
    </Layout>
  )
}

export default PublicLayout
