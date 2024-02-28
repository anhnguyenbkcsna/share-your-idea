import styles from './styles.module.scss'
import React from 'react'

export default function RankingBox() {
  return (
    <div className={styles.rankingBox}>
      <div className={styles.title}>
        Xếp hạng {'#' + 20}/128
      </div>
      <div className={styles.other}>
        <span href='#'>Bài thứ hạng 17</span>
        <span href='#'>Bài thứ hạng 17</span>
        <span href='#'>Bài thứ hạng 17</span>
        <span href='#'>Bài thứ hạng 17</span>
        <span href='#'>Bài thứ hạng 17</span>
        <span href='#'>Bài thứ hạng 17</span>
      </div>
    </div>
  )
}
