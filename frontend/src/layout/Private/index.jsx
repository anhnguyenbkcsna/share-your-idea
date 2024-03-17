import { Button, Layout, Menu, theme } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import styles from './styles.module.scss'
import React from 'react'
import logosvg from '../../assets/Worldea.svg'
import { useAuth } from '../../hooks/auth'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavHeader from '../NavHeader'
import { userRoles } from '../../utils/global.constants'
import UnauthorizedPage from '../../pages/Error/E403'
import { useEffect } from 'react'
import Footer from '../Footer'

const PrivateLayout = (props) => {
  const { getUser } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    getUser()
      .then(user => {
        // console.log('Innovator user', user)
        if (!user) {
          navigate('/login')
        }
        else if (user.role) {
          const userHasRequiredRole = user && userRoles.hasOwnProperty(user.role.toUpperCase()) ? true : false
          if (!userHasRequiredRole) {
            return <UnauthorizedPage />
          }
        }
      })
  }, [])


  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ background: colorBgContainer }} >
      <NavHeader role='innovator' />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default PrivateLayout
