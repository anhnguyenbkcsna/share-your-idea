import React from 'react'
import styles from '../styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { OrangeBasicButton } from './button'

export const ContestNotFoundElement = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.notFoundElementContainer}>
      <h3 style={{ marginBottom: '10vw', fontWeight: 'bold' }}>
        Cuộc thi không tồn tại hoặc đã bị xóa
      </h3>
      <OrangeBasicButton
        text='Về trang chủ'
        onClick={() => navigate('/')}
      />
    </div>
  )
}
