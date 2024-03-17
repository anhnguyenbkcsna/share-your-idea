import { Button, Layout, Menu, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import ContestHeader from '../Header'
import ContestFooter from '../Footer'
// import NavHeader from '../NavHeader'


const PublicLayout = (props) => {
  return (
    <Layout>
      <ContestHeader />
      <Content
        style={{
          minHeight: '100vh',
          background: '#000',
          height: '100%',
          color: '#fff',
          fontFamily: 'Play, sans-serif'
        }}>
        <Outlet />
      </Content>
      <ContestFooter />
    </Layout>
  )
}

export default PublicLayout
