import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useDomain } from '../../../hooks/domain'
import { GlowingBall } from '../../../pages/Contest/Components/glowingBall'


export default function ContestHeader() {
  const navigate = useNavigate()
  const { domain } = useDomain()

  const handleLogoClick = () => {
    navigate('/contest')
  }

  const handleSignInClick = (e) => {
    navigate('/login', { state: { sys: 'contest' } })
    // window.location.href = `${window.location.protocol}//${domain}/login?subdomain=contest`
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
        WorIdea.
        <GlowingBall style={{
          top: -80,
          left: -60
        }} />
      </div>
      <div
        className={styles.navContainer}
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
        {localStorage.getItem('name') ?
          <div className={styles.userName}>
            {localStorage.getItem('name')}
          </div>
          : 'Sign In'}
      </div>
    </div>
  )
}
