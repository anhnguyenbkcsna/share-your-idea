import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export default function ContestHeader() {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
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
      <div>
        Sign In
      </div>
    </div>
  )
}
