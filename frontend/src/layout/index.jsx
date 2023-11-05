import React, { Children, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import Sidebar from './Sidebar'
import CusHeader from './AccountHeader'
import { AuthProvider, useAuth } from '../hooks/auth'
import { Navigate, Outlet } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const PersonalLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <CusHeader setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
          }}
        >
          {/* {props.children} */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}


export default PersonalLayout
