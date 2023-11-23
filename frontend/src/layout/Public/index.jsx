import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import Footer from '../Footer'
import { NavLink, Outlet } from 'react-router-dom'
import NavHeader from '../NavHeader'


const PublicLayout = (props) => {
  // const {user, logout} = useAuth()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <NavHeader role='innovator'/>
      <Content
        style={{
          minHeight: '100vh',
          background: colorBgContainer,
        }}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default PublicLayout
