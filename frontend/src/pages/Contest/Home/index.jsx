import React from 'react'
import styles from './styles.module.scss'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function HomePage() {
  return (
    <div
      className={styles.contestHomeContainer}
    >
      <div className={styles.contestHomeBg} />
      <h1
        style={{
          color: '#FF7510',
          fontSize: '6rem',
          height: 160,
          lineHeight: '160px',
          fontFamily: 'Michroma, sans-serif',
          // boxShadow: '0 0 10px 0 #FF7510',
          // filter: "blur(1px)",
          // background: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        INNOVATION COMPETITION
      </h1>
      <div
        style={{
          fontSize: '3rem',
          marginBottom: 10
        }}
      >
        WANNA HOST A STARTUP IDEA COMPETITION?
      </div>
      <div
        style={{
          fontSize: '2rem',
        }}
      >
        GET EVERYTHING TO LAUNCH AN EVENT READY!
      </div>
      <button
        className={styles.createEventButton}
      >
        CREATE NEW EVENT
      </button>
    </div>
  )
}
