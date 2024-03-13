import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useDomain } from '../../../hooks/domain'


export default function ContestHeader() {
  const navigate = useNavigate()
  const { domain } = useDomain()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSignInClick = (e) => {
    window.location.href = `${window.location.protocol}//${domain}/login?subdomain=contest`
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
