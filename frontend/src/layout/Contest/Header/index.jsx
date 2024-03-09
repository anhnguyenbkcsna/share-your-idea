import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useDomain } from '../../../hooks/domain'
import { GlowingBall } from '../../../pages/Contest/Components/glowingBall'


export default function ContestHeader() {
  const navigate = useNavigate()
  const { domain } = useDomain()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSignInClick = (e) => {
    window.location.href = `${window.location.protocol}//${domain}/login?subdomain=contest`
  }

  const scrollToElm = (elm) => {
    elm?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <div
        onClick={handleLogoClick}
        className={styles.contestLogo}
      >
        WorIdea
        <GlowingBall style={{
          top: -80,
          left: -60
        }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div
          className={styles.navItem}
          onClick={() => scrollToElm(document.getElementById('contest-heading'))}
        >Events</div>
        <div className={styles.navItem}>Contact</div>
        <div className={styles.navItem}>About us</div>
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
