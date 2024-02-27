import styles from './styles.module.scss'
import React from 'react'

export default function ContestIdeaCard({ idea }) {
  // when idea is null, return a dummy card to fill the space
  const WIDTH_OF_CARD = 280
  if (!idea)
  {
    return (
      <div
        className='dummy'
        style={{ width: WIDTH_OF_CARD, height: 0, background: 'transparent' }}
      />
    )
  }

  const { ideaImgUrl, title, field, innovatorAvtUrl, innovatorName } = idea
  return (
    <div style={{ width: WIDTH_OF_CARD }} className={styles.contestIdeaCard}>
      <img
        alt='contest'
        src={ideaImgUrl}
      />
      <div className={styles.cardInfo}>
        <div className={styles.cardHeading}>
          {title}
        </div>
        <div className={styles.field}>
          {field}
        </div>
        <div style={{ flex: 1 }} />
        <div className={styles.authorLine}>
          <div className={styles.authorAvtWrapper}>
            <img
              alt='contest'
              src={innovatorAvtUrl}
            />
          </div>
          <div className={styles.authorName}>
            {innovatorName}
          </div>
        </div>
      </div>
    </div>
  )
}
