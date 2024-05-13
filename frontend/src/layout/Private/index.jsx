import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React, { useState } from 'react'
import logosvg from '../../assets/Worldea.svg'
import { useAuth } from '../../hooks/auth'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import NavHeader from '../NavHeader'
import { userRoles } from '../../utils/global.constants'
import UnauthorizedPage from '../../pages/Error/E403'
import { useEffect } from 'react'
import Footer from '../Footer'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  ProjectOutlined,
  DollarOutlined,
} from "@ant-design/icons"
const { Sider } = Layout

const PrivateLayout = ({ requiredRoles = [userRoles.COMPANY, userRoles.INNOVATOR] }) => {
  const { getUser } = useAuth()
  const [collapsed, setCollapsed] = React.useState(true)
  const navigate = useNavigate()
  let location = useLocation()

  // useEffect(() => {
  //   getUser()
  //     .then(user => {
  //       if (!user)
  //       {
  //         navigate('/login')
  //       }

  //       // const userHasRequiredRole = user && userRoles.hasOwnProperty(user.role.toUpperCase()) ? true : false
  //       const userHasRequiredRole = requiredRoles.includes(user?.role)
  //       console.log('userHasRequiredRole', userHasRequiredRole)
  //       if (!userHasRequiredRole)
  //       {
  //         alert('Unauthorized')
  //         // const res = new Response('Unauthorized', { status: 403 })
  //         // console.log('response', res)
  //         // return res
  //       }

  //     })
  // }, [])


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
          className="navbtn-container"
          style={{
            position: "fixed",
            zIndex: 1,
            height: "100vh",
            width: collapsed ? "80px" : "256px",
            background: colorBgContainer,
            transition: "width 0.2s",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              margin: 0,
              width: "100%",
              background: colorBgContainer,
            }}
          />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <BulbOutlined />,
                label: <Link to={"/"}>Innovation Idea</Link>,
              },
              {
                key: "2",
                icon: <ProjectOutlined />,
                label: <Link to={"/contest"}>Innovation Contest</Link>,
              },
              {
                key: "3",
                icon: <DollarOutlined />,
                label: <Link to={"/sponsor"}>Innovation Sponsor</Link>,
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <NavHeader role="innovator" />
        <Content
          style={{
            margin: "24px 16px",
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

export default PrivateLayout
