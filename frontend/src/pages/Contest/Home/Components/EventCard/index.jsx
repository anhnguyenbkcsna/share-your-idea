import React from 'react'
import styles from './styles.module.scss'
import { OrangeWhiteShadowButton } from '../../../Components/button'
import { useNavigate } from 'react-router-dom'
import { isGreaterDate, formatDate } from '../../../../../utils/utils'

const ContestEventCard = ({ contest }) => {
  const navigate = useNavigate()

  const {
    id,
    deadline,
    topic,
    location = 'Chưa cập nhật',
    organizer,
    otherInfo = 'Chưa cập nhật'
  } = contest
  const dateInStr = formatDate(deadline)

  const handleViewClick = () => {
    navigate(`${id}`)
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          {contest?.status ? 'opening' : 'closed'}
        </div>
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
        {`Chủ đề: ${topic}`}
      </div>
      <div className={styles.line}>
        {`Yêu cầu: ${otherInfo}`}
      </div>
      <div className={styles.footerContainer}>
        <OrangeWhiteShadowButton
          className={styles.footerButton}
          style={{
            margin: '0 auto'
          }}
          onClick={handleViewClick}
          text='Xem' />
      </div>
    </div>
  )
}

export default ContestEventCard
