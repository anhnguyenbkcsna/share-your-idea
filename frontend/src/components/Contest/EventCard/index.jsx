import React from 'react'
import styles from './styles.module.scss'
import { Button } from 'antd'

const ContestEventCard = ({ contest }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>Event Title</div>
        <div className={styles.headerDate}>18/01/2024</div>
      </div>
      <h3 className={styles.title}>GDSC HCM</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
        condimentum, nisl non tincidunt luctus, nunc dui lacinia massa, quis
        aliquam arcu metus vel orci. Sed in metus in sapien tincidunt
        condimentum. Sed in metus in sapien tincidunt condimentum.
      </p>
      <div className={styles.footerContainer}>
        <Button type="primary" className={styles.footerButton}>View</Button>
      </div>
    </div>
  )
}

export default ContestEventCard
