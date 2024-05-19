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

const PrivateLayout = ({ requiredRoles = [userRoles.COMPANY, userRoles.INNOVATOR] }) => {
  const { getUser } = useAuth()
  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    getUser()
      .then(user => {
        if (!user)
        {
          navigate('/login')
        }

        // const userHasRequiredRole = user && userRoles.hasOwnProperty(user.role.toUpperCase()) ? true : false
        const userHasRequiredRole = requiredRoles.includes(user?.role)
        console.log('userHasRequiredRole', userHasRequiredRole)
        if (!userHasRequiredRole)
        {
          alert('Unauthorized')
          // const res = new Response('Unauthorized', { status: 403 })
          // console.log('response', res)
          // return res
        }

      })
  }, [])


  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout style={{ background: colorBgContainer }} >
      <NavHeader />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  )
}

export default PrivateLayout
