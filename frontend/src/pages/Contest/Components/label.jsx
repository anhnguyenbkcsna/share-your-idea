import React from 'react'
import styles from '../styles.module.scss'

export default function ContestStatusLabel({ title = 'opening' }) {
  return (
    <div className={styles.contestStatusLabel}>
      {title}
    </div>
  )
}
