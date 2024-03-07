import React from 'react'
import styles from '../styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { OrangeBasicButton } from './button'

export const ContestNotFoundElement = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.notFoundElementContainer}>
      <span style={{ marginBottom: 20 }}>
        404 NOT FOUND
      </span>
      <OrangeBasicButton
        text='Về trang chủ'
        onClick={() => navigate('/')}
      />
    </div>
  )
}
