import React from "react"
import styles from "./styles.module.scss"
import { OrangeWhiteShadowButton } from "../../../Components/button"
import { useNavigate } from "react-router-dom"
import { isGreaterDate, formatDate } from "../../../../../utils/utils"

const ContestEventCard = ({ contest }) => {
  const navigate = useNavigate()

  const {
    name,
    topic,
    location,
    otherInfo,
    prize1,
    prize1Value,
    prize1Quantity,
    prize2,
    prize2Value,
    prize2Quantity,
    prize3,
    prize3Value,
    prize3Quantity,

    round1,
    roundType1,
    scoringType1,
    time1,

    round2,
    roundType2,
    scoringType2,
    time2,

    round3,
    roundType3,
    scoringType3,
    time3,

    round4,
    roundType4,
    scoringType4,
    time4,

    round5,
    roundType5,
    scoringType5,
    time5,
    description,
    submission_list,
    id,
  } = contest

  const dateInStr = (date) => {
    return formatDate(date)
  }

  const getContestTimeline = () => {
    const start = dateInStr(time1.start)
    const end = contest.round5 ? dateInStr(time5.end) :
      contest.round4 ? dateInStr(time4.end) :
      contest.round3 ? dateInStr(time3.end) :
      contest.round2 ? dateInStr(time2.end) :
      dateInStr(time1.end)
    return `${start} - ${end}`
  }
  const getNumberOfSubmission = submission_list ? submission_list.length : 0
  const handleViewClick = () => {
    navigate(`${contest.id}`)
  }

  return (
    <div className={styles.cardContainer}>
      <div
        className={
          contest?.status ? styles.headerContainer : styles.closeContainer
        }
      >
        <div className={styles.headerTitle}>
          {contest ? "opening" : "closed"}
        </div>
        <div className={styles.headerDate}>{getContestTimeline()}</div>
      </div>
      <h3 className={styles.title}>{contest.name}</h3>
      {/* <div className={styles.line}>
        {`Hạn chót nộp ý tưởng: ${dateInStr}`}
      </div> */}
      {/* <div className={styles.line}>
        {`Địa điểm tổ chức: ${location}`}
      </div> */}
      <div className={styles.line}>Chủ đề: <span className={styles.highlightText}>{contest.topic}</span></div>
      <div className={styles.line}>
        Địa điểm tổ chức: <span className={styles.highlightText}>{contest.location}</span>
      </div>
      <div className={styles.line}>
        <div className={styles.highlightText}>
          {getNumberOfSubmission} bài dự thi
        </div>
      </div>

      <div className={styles.line}>Thời gian diễn ra</div>
      <div className={styles.line}>
        <div className={styles.highlightText}>
          {dateInStr(contest.time1.start)} - {dateInStr(contest.time1.end)}
        </div>
      </div>

      <div className={styles.footerContainer}>
        <OrangeWhiteShadowButton
          className={styles.footerButton}
          style={{
            margin: "0 auto",
          }}
          onClick={handleViewClick}
          text="Xem"
        />
      </div>
    </div>
  )
}

export default ContestEventCard
