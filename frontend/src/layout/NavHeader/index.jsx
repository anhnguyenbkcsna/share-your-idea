import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import Footer from '../Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useState } from 'react'

const guestMenu = [
  {
    key: '1',
    label: (
      <NavLink to={'/'}>
        Về chúng tôi
      </NavLink>
    )
  },
  {
    key: '2',
    label: (
      <NavLink to={'/faq'}>
        Câu hỏi thường gặp
      </NavLink>
    )
  }
]
const innovatorMenu = [
  {
    key: '1',
    label: (
      <NavLink to={'/'}>
        Về chúng tôi
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink to={'/innovator'}>
        Danh sách ý tưởng
      </NavLink>
    )
  },
  {
    key: '3',
    label: (
      <NavLink to={'/faq'}>
        Câu hỏi thường gặp
      </NavLink>
    )
  }
]
const companyMenu = [
  {
    key: '1',
    label: (
      <NavLink to={'/'}>
        Về chúng tôi
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink to={'/match-idea'}>
        Ý tưởng đề xuất
      </NavLink>
    )
  },
  {
    key: '3',
    label: (
      <NavLink to={'/faq'}>
        Câu hỏi thường gặp
      </NavLink>
    )
  }
]

const NavHeader = (props) => {
  const navigate = useNavigate()
  const { role } = props
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
        items={role === 'innovator' ? innovatorMenu : role === 'company' ? companyMenu : guestMenu}
        className={'w-90'}
      />
      {!user ?
        <div>
          <NavLink to={'login'}>
            <Button type='text'>Đăng nhập</Button>
          </NavLink>
          <NavLink to={'profile'}>
            <Button type='primary'>Đăng ký</Button>
          </NavLink>
        </div> :
        <div>
          <span>{`Xin chào ${user.name}!`}</span>
          <Button onClick={() => logout()} type='primary'>Thoát</Button>
        </div>}
    </Header>
  )
}

export default NavHeader
