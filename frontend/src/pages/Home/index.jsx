import React from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { Button } from 'antd'
import planImg from '../../assets/plan.png'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
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
      <div className={styles.container}>
        <section className={styles.section1}>
          <h1 className={styles.title1}>Launch Idea Becomes So Approachable</h1>
          <h1 className={styles.title2}>Keep <span>Creating</span></h1>
          <div className={styles.columns}>
            <div className={styles.col1}>
              <img src={planImg} alt="plan" />
            </div>
            <div className={styles.col2}>
              <p>Connect to our global network of partners,
                entrepreneurs and investors. Feature in the world’s largest database
                with green ideas, the place where business matches are made.</p>
              <h2>+100 <span>Companies</span></h2>
              <h2>+1000 <span>Startup Ideas</span></h2>
            </div>
          </div>
        </section>

        <section className={styles.section2}>
          <h1 className={styles.title1}>Launch Idea Becomes So Approachable</h1>
          <h1 className={styles.title2}>Keep <span>Creating</span></h1>
          <div className={styles.columns}>
            <div className={styles.col2}>
              <p>Connect to our global network of partners, entrepreneurs and
                investors. Feature in the world’s largest database with green ideas, the place
                where business matches are made.</p>
              <h2>+100 <span>Companies</span></h2>
              <h2>+1000 <span>Startup Ideas</span></h2>
            </div>
            <div className={styles.col1}>
              <img src={planImg} alt="plan" />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
