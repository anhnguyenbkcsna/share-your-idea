import { Content, Header } from 'antd/es/layout/layout'
import ContestHeader from '../Header'
import ContestFooter from '../Footer'
// import NavHeader from '../NavHeader'
import React, { useState } from 'react'
import Footer from '../Footer'
import { Link, Outlet } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  ProjectOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import NavHeader from '../../NavHeader'
const { Sider } = Layout

const PublicLayout = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout>
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
            <Menu
              theme='light'
              mode='inline'
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <BulbOutlined />,
                  label: <Link to={'/'}>Innovation Idea</Link>,
                },
                {
                  key: '2',
                  icon: <ProjectOutlined />,
                  label: <Link to={'/contest'}>Innovation Contest</Link>,
                },
                {
                  key: '3',
                  icon: <DollarOutlined />,
                  label: <Link to={'/sponsor'}>Innovation Sponsor</Link>,
                },
              ]}
            />
          </div>
        </Sider>
      </Layout>
      <NavHeader />
      <Content
        style={{
          minHeight: '100vh',
          background: '#f0f2f5',
          height: '100%',
          color: '#000',
          // fontFamily: 'Play, sans-serif'
          fontFamily: 'Nunito Sans, sans-serif'
        }}>
        <Outlet />
      </Content>
      <ContestFooter />
    </Layout>
  )
}

export default PublicLayout
