import React from 'react'
import styles from './styles.module.scss'
import { GoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import loginImg from '../../assets/login.png'
import { validateGoogleResponse } from '../../utils/validate'
import { gooleTokenInfo } from '../../utils/form.constants'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { localStorageConstant, userRoles } from '../../utils/global.constants'

const LoginPage = () => {
  const navigate = useNavigate()
  const {login} = useAuth()

  const validateUserToken = (token) => {
    axios.get(`${gooleTokenInfo}${token}`
    ).then((res) => {
      const validate = validateGoogleResponse(res, token)
      if (validate === true) {
        login({
          name: localStorage.getItem(localStorageConstant.NAME),
          email: localStorage.getItem(localStorageConstant.EMAIL),
          role: userRoles.INNOVATOR
        })
      }
      navigate(-1, {replace: true})
      return validate
    }).catch(err => {
      return err
    })
  }

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1>Login</h1>
          <p>Description Login</p>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse)
              validateUserToken(credentialResponse.credential)
            }}
            onError={() => {
              // console.log('Login Failed')
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
