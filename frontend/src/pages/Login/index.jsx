import React from 'react'
import styles from './styles.module.scss'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import loginImg from '../../assets/login.png'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { loginEndpoint } from '../../utils/api.constants.js'
import { localStorageConstant } from '../../utils/global.constants'
import { useSearchParams } from 'react-router-dom'
import { cookiesConstant } from '../../utils/global.constants'


const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  // const [searchParams] = useSearchParams()

  const validateUserToken = (token) => {
    let newFormdata = new FormData()

    newFormdata.append('id_token', token)
    axios
      .post(loginEndpoint, newFormdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        let data = res.data
        localStorage.setItem(localStorageConstant.ACCESS_TOKEN, data.access)
        localStorage.setItem(localStorageConstant.NAME, data.name)
        localStorage.setItem(localStorageConstant.EMAIL, data.email)
        localStorage.setItem(localStorageConstant.ROLE, data.role)
        localStorage.setItem(localStorageConstant.API_TOKEN, token)
        // localStorage.setItem(localStorageConstant.ID, data.id)
        login({
          name: data.name,
          email: data.email,
          role: data.role,
        })

        navigate('/')
        // let subdomain = searchParams.get('subdomain') !== null ? `${searchParams.get('subdomain')}.` : ''
        // window.location.href = `${window.location.protocol}//${subdomain}${window.location.host}/`
      })
      .catch((err) => {
        console.log(err)

        // const subDomainQueryParam = searchParams.get('subdomain') !== null ?
        //   `?subdomain=${searchParams.get('subdomain')}` : ''
        // navigate('/profile' + subDomainQueryParam)
      })
  }

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1>Đăng nhập</h1>
          <p>Thông tin đăng nhập</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
              validateUserToken(credentialResponse.credential)
            }}
            onError={() => {
              console.log('Login Failed')
              // raise alert
            }}
          />
        </div>

        <div className={styles.col2}>
          <img src={loginImg} alt="login" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
