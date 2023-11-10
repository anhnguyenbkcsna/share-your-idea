import { Avatar, Button, Popover, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'

const CusHeader = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { collapsed, setCollapsed } = props
  return (
    <Header
      style={{ padding: 0, background: colorBgContainer }}
      className="header-flex"
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Popover
        content={<Button>Logout</Button>}
        placement="bottom"
        trigger="click"
      >
        <Avatar
          className="mr-24"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
        />
        <span className="mr-24">Tài khoản</span>
      </Popover>
    </Header>
  )
}

export default CusHeader
