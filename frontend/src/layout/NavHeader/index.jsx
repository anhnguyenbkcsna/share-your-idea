import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import Footer from '../Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useState } from 'react'

const guestMenu = [
  {
    key: '1',
    label: (
      <Link to={'/'}>
        Về chúng tôi
      </Link>
    )
  },
  {
    key: '2',
    label: (
      <Link to={'/faq'}>
        Câu hỏi thường gặp
      </Link>
    )
  }
]
const innovatorMenu = [
  {
    key: '1',
    label: (
      <Link to={'/'}>
        Về chúng tôi
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to={'/innovator'}>
        Danh sách ý tưởng
      </Link>
    )
  },
  {
    key: '3',
    label: (
      <Link to={'/faq'}>
        Câu hỏi thường gặp
      </Link>
    )
  }
]
const companyMenu = [
  {
    key: '1',
    label: (
      <Link to={'/'}>
        Về chúng tôi
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to={'/match-idea'}>
        Ý tưởng đề xuất
      </Link>
    )
  },
  {
    key: '3',
    label: (
      <Link to={'/faq'}>
        Câu hỏi thường gặp
      </Link>
    )
  }
]

const NavHeader = (props) => {
  const navigate = useNavigate()
  const { role, colorBgContainer: colorByRoute } = props
  console.log(colorByRoute)
  const {user, logout} = useAuth()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <div>
      <Header
        style={{
          background: colorBgContainer,
          top: 0,
          zIndex: 1,
          padding: '0 75px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          lineHeight: '',
          // boxShadow: '5px 3px 10px gray'
        }}>
        <div className={styles['header-logo']}>
          <div>
            <img src={logosvg} alt="logo" style={{height: '70%', width: 'fit-content'}}/>
          </div>
        </div>
        {!user ?
          <div>
            <Link to={'/login'}>
              <Button type='text'>Đăng nhập</Button>
            </Link>
            <Link to={'/profile'}>
              <Button type='primary'>Đăng ký</Button>
            </Link>
          </div> :
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            minWidth: '300px'
          }}>
            <span>{user.name ?? 'Bạn chưa đăng nhập'}</span>
            <Button onClick={() => logout()} type='primary' style={{
              maxWidth: '100px',
            }}>Thoát</Button>
          </div>}
      </Header>
      <div style={{backgroundColor: colorByRoute? colorByRoute: '#f69d3c', height: '30px'}}></div>
    </div>
  )
}

export default NavHeader
