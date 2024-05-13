import React, { useState } from "react"
import { Menu } from 'antd'

const items = [
  {
    label: (
      <a href="https://ant.design">
        Trang chủ
      </a>
    ),
    key: 'homepage',
  },
  {
    label: (
      <a href="https://ant.design">
        Dự án kêu gọi tài trợ
      </a>
    ),
    key: 'projects',
  },
  {
    label: (
      <a href="https://ant.design">
        Kêu gọi tài trợ
      </a>
    ),
    key: 'create',
  },
]

const SponsorHeader = () => {
  const [current, setCurrent] = useState('homepage')
  const onClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 50px',
        width: '100%',
        top: 0,
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '# ',
        position: 'fixed'
      }}
    />
  )
}

export default SponsorHeader