import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { localStorageConstant } from '../../../utils/global.constants'
import { authEndpoint } from '../../../utils/api.constants'
import { useAuth } from '../../../hooks/auth'
import { useDomain } from '../../../hooks/domain'


export default function ContestHeader() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { domain } = useDomain()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSignInClick = (e) => {
    window.location.href = `${window.location.protocol}//${domain}/login?subdomain=contest`
  }

  const validateUserToken = (token) => {
    let newFormdata = new FormData()

    newFormdata.append('id_token', token)
    axios
      .post(authEndpoint, newFormdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        let data = res.data.data
        localStorage.setItem(localStorageConstant.ACCESS_TOKEN, res.access)
        localStorage.setItem(localStorageConstant.NAME, data.name)
        localStorage.setItem(localStorageConstant.EMAIL, data.email)
        localStorage.setItem(localStorageConstant.ROLE, data.role)
        localStorage.setItem(localStorageConstant.ID, data.id)
        login({
          name: data.name,
          email: data.email,
          role: data.role,
        })
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
        navigate('/profile')
      })
  }

  return (
    <div
      className={styles.container}
    >
      <div
        onClick={handleLogoClick}
        className={styles.contestLogo}
      >
        WorIdea
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'underline',
        }}
      >
        <div style={{ marginRight: 56 }}>Contact</div>
        <div style={{ marginRight: 56 }}>Events</div>
        <div>About us</div>
      </div>
      <div
        className={styles.signIn}
        onClick={handleSignInClick}
      >
        Sign In
      </div>
    </div>
  )
}
