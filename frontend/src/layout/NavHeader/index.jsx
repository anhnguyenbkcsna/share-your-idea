import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import Footer from '../Footer'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useState } from 'react'


const NavHeader = (props) => {
  const {user, logout} = useAuth()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Header
      style={{
        background: colorBgContainer,
        position: 'sticky',
        top: 0,
        zIndex: 1,
        padding: '0 50px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        lineHeight: '',
        boxShadow: '5px 3px 10px gray'
      }}>
      <div className={styles['header-logo']}>
        <div>
          <img src={logosvg} alt="logo"/>
        </div>
      </div>
      <Menu
        style={{width: 'auto'}}
        mode="horizontal"
        disabledOverflow={true}
        defaultSelectedKeys={['2']}
        items={[
          {
            key: '1',
            label: 'Về chúng tôi',
          },
          {
            key: '2',
            label: 'Nhà sáng tạo',
          },
          {
            key: '3',
            label: 'Câu hỏi thường gặp',
          },
        ]}
        className={'w-90'}
      />
      {!user ?
        <div>
          <NavLink to={'login'}>
            <Button type='text'>Đăng nhập</Button>
          </NavLink>
          <Button type='primary'>Đăng ký</Button>
        </div> :
        <div>
          <span>{`Xin chào ${user.name}!`}</span>
          <Button onClick={() => logout()} type='primary'>Thoát</Button>
        </div>}
    </Header>
  )
}

export default NavHeader
