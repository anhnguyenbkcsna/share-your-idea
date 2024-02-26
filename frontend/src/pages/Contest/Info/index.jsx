import React, { useState } from "react"
import styles from './styles.module.scss'
import { Button, Divider, Card } from 'antd'

const ContestInfo = () => {
  const [firstPrizeValue, setFirstPrizeValue] = useState(2500)
  const [secondPrizeValue, setSecondPrizeValue] = useState(1000)
  const [thirdPrizeValue, setThirdPrizeValue] = useState(500)
  const [submissions, setSubmissions] = useState(232)
  const [vote, setVote] = useState(23142)

  return (
    <div>
      <img 
        className={styles.banner} 
        src="https://www.pvoil.com.vn/Data/Sites/1/media/tinpvoil/2021/20210924-p1.jpg" 
        alt="Banner" 
      />
      <div className={styles.container}>
        <h1 className={styles.contestName}>Contest Info</h1>

        <div className={styles.contestPrize}>
          {/* Second Prize Box */}
          <div className={styles.prizeBox}>
            <h3 className={styles.prizeValue}>${secondPrizeValue}</h3>
            <div className={styles.secondPrizeBox}>
              <div className={styles.prizeBoxTitle}>2nd Prize</div>
            </div>
          </div>
          {/* First prize box */}
          <div className={styles.prizeBox}>
            <h3 className={styles.prizeValue}>${firstPrizeValue}</h3>
            <div className={styles.firstPrizeBox}>
              <div className={styles.prizeBoxTitle}>1st Prize</div>
            </div>
          </div>
          {/* Third prize box */}
          <div className={styles.prizeBox}>
            <h3 className={styles.prizeValue}>${thirdPrizeValue}</h3>
            <div className={styles.thirdPrizeBox}>
              <div className={styles.prizeBoxTitle}>3rd Prize</div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '100px auto'
        }}>
          <Button type="primary" className={styles.submitButton}>
            Nộp ý tưởng
          </Button> 
        </div>
        <Divider />
        <div className={styles.contestDescription}>
          <div className={styles.description}>
            <ol>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
              <li>Distinctio cumque, ea ut animi rerum totam facere nostrum corporis nam provident, eius voluptas.</li>
              <li>Dolores aliquid saepe quod recusandae harum similique esse?</li>
            </ol>
          </div>

          <div className={styles.timeline}>
            <div className={styles.submitTime}>
              <h3>Thời gian gửi bài</h3>
              <h3>Từ <span className={styles.time}>06/09/2023</span></h3>
              <h3>Đến <span className={styles.time}>06/09/2023</span></h3>
            </div>
            <div className={styles.contestTime}>
              <h3>Thời gian cuộc thi</h3>
              <h3>Từ <span className={styles.time}>06/09/2023</span></h3>
              <h3>Đến <span className={styles.time}>06/09/2023</span></h3>
            </div>
            <div>
              <h3>Số bài dự thi </h3>
              <h3><span className={styles.time}>{submissions}</span></h3>
            </div>
            <div>
              <h3>Tổng số lượt bình chọn</h3>
              <h3><span className={styles.time}>{vote}</span></h3>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Danh sách vòng thi</h3>
            <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                Vòng 1: Vòng loại  
              </p></a>
              <span className={styles.roundDescription}>13/04/2023 08:00 - 01/08/2023 12:00</span>
            </div>
            <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                Vòng 2: Vòng thi bán kết  
              </p></a>
              <span className={styles.roundDescription}>13/04/2023 08:00 - 01/08/2023 12:00</span>
            </div>
            <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                Vòng 3: Vòng thi chung kết
              </p></a>
              <span className={styles.roundDescription}>13/04/2023 08:00 - 01/08/2023 12:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContestInfo
