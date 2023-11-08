import styles from './styles.module.scss'
import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'

// For Company Only
const IdeaMatchingPage = () => {
  return (
    <section className={classNames(styles.bg)}>
      <div className={classNames('w-90', styles.description)}>
        Connect your
        <p className={styles.emp}>
          Innovative Idea</p>
        with worldwide <br/>
        <p className={styles.emp}>Entrepreneurs & Investors</p>
        <p style={{fontSize: '17px', fontWeight: '300', fontStyle: 'italic'}}>Our Mission is to make your
          idea come true with the help of our trustworthy partners! </p>
        <NavLink to={'/innovator'}>
          <Button shape="round" className={styles.btn}>Create Your Idea</Button>
        </NavLink>
      </div>
      <div className={classNames(styles['bg-circle'])}/>
    </section>
  )
}

export default IdeaMatchingPage
