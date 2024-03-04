import React from 'react'
import styles from './styles.module.scss'
import { Button } from 'antd'
import { formatDate } from '../../../utils/utils'
import { OrangeWhiteShadowButton } from '../../../pages/Contest/Components/button'

const ContestEventCard = ({ contest }) => {
  const {
    status,
    deadline,
    location,
    organizer,
    note
  } = contest
  const dateInStr = formatDate(deadline)

  return (
    <div className={styles.cardContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>{status ? 'opening' : 'closed'}</div>
        <div className={styles.headerDate}>{dateInStr}</div>
      </div>
      <h3 className={styles.title}>{organizer}</h3>
      <div className={styles.line}>
        {`Hạn chót nộp ý tưởng: ${dateInStr}`}
      </div>
      <div className={styles.line}>
        {`Địa điểm tổ chức: ${location}`}
      </div>
      <div className={styles.line}>
        {`Chủ đề: ${location}`}
      </div>
      <div className={styles.line}>
        {`Yêu cầu: ${note}`}
      </div>
      <div className={styles.footerContainer}>
        <OrangeWhiteShadowButton
          className={styles.footerButton}
          style={{
            margin: '0 auto'
          }}
          text='Xem' />
      </div>
    </div>
  )
}

export default ContestEventCard
