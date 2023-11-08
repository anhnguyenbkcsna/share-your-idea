import { Button, Layout, Menu, Spin, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import { useAuth } from '../../hooks/auth'
import { Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'
import NavHeader from '../NavHeader'
import { userRoles } from '../../utils/global.constants'
import UnauthorizedPage from '../../pages/Error/E403'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'

const PrivateLayout = (props) => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  // useEffect(() => {
  //   console.log('Innovator user', user)
  //   if (!user) {
  //     navigate('/login')
  //   } else if (user.role) {
  //     const userHasRequiredRole = user && userRoles.hasOwnProperty(user.role.toUpperCase()) ? true : false
  //     if (!userHasRequiredRole) {
  //       return <UnauthorizedPage />
  //     }
  //   }
  // },[user])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return user ? (
    <Layout style={{background: colorBgContainer}} >
      <NavHeader />
      <Content
      ><Outlet />
      </Content>
    </Layout>)
    : loading ? (<Spin />) : <Navigate to ='/login' />
}

export default PrivateLayout
