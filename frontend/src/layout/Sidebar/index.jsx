import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import logo from '../../assets/Worldea.svg'
import logoAbbr from '../../assets/W.svg'

const Sidebar = (props) => {
  const { collapsed } = props
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div />
      <img
        style={{ margin: '20px' }}
        src={collapsed ? logoAbbr : logo}
        alt="logo"
      />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar
