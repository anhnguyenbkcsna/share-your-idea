import React from 'react'
import styles from './styles.module.scss'
import logosvg from '../../assets/Worldea.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <h3
            style={{width: '70%'}}>
            WorIdea is a dynamic platform that bridges the gap between visionary
            innovators and forward-thinking sponsors. Our mission is to foster innovation,
            drive economic growth, and solve complex challenges by connecting creative thinkers
            with the financial and strategic support they need.</h3>
        </div>
        <div>
          <h3 >About us</h3>
          <ul>
            <li>Innovator</li>
            <li>Our Partners</li>
            <li>Mission</li>
          </ul>
        </div>
        <div>
          <h3>Innovator</h3>
          <ul>
            <li>Blogs</li>
            <li>Connection</li>
            <li>Seeking help</li>
          </ul>
        </div>
        <div style={{margin: 'auto'}}>
          <img src={logosvg} alt="logo"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
