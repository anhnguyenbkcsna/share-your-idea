import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import { useAuth } from '../../hooks/auth'
import { Outlet, useLocation, useNavigate} from 'react-router-dom'
import NavHeader from '../NavHeader'
import { userRoles } from '../../utils/global.constants'
import UnauthorizedPage from '../../pages/Error/E403'
import { useEffect } from 'react'

const PrivateLayout = (props) => {
  const {user} = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    console.log('Innovator user', user)
    if (!user) {
      navigate('/login')
    } else if (user.role) {
      const userHasRequiredRole = user && userRoles.hasOwnProperty(user.role.toUpperCase()) ? true : false
      if (!userHasRequiredRole) {
        return <UnauthorizedPage />
      }
    }
  },[])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{background: colorBgContainer}} >
      <NavHeader />
      <Content
        style={{
          minHeight: '100vh',
          margin: '50px auto',
          padding: '50px',
          width: '80%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '2px 2px 10px gray',
          background: 'white',
        }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default PrivateLayout
