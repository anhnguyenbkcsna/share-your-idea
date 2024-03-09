import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button, Divider, ConfigProvider, Flex } from 'antd'
import { useParams } from 'react-router-dom'
import { getContestById } from '../../../api/contest'
import { ContestNotFoundElement } from '../Components/error'
import { GlowingBall } from '../Components/glowingBall'
import Parser from 'html-react-parser'

const ContestInfo = () => {
  const [firstPrizeValue, setFirstPrizeValue] = useState(2500)
  const [secondPrizeValue, setSecondPrizeValue] = useState(1000)
  const [thirdPrizeValue, setThirdPrizeValue] = useState(500)
  const [submissions, setSubmissions] = useState(232)
  const [vote, setVote] = useState(23142)

  const [idea, setIdea] = useState()
  const { contestId } = useParams()

  useEffect(() => {
    getContestById(contestId)
      .then(res => {
        console.log(res)
        setIdea(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const convertToHtml = () => {
    let res = ''
    try
    {
      res = Parser(idea?.description)
    }
    catch (e)
    {
      res = idea?.description
    }
    return res
  }

  return idea ? (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Play',
        },
      }}
    >
      <img
        className={styles.banner}
        src="https://www.pvoil.com.vn/Data/Sites/1/media/tinpvoil/2021/20210924-p1.jpg"
        alt="Banner"
      />
      <div className={styles.container}>
        <h1 className={styles.contestName}>{idea?.name}</h1>

        <div className={styles.contestPrize}>
          {/* Second Prize Box */}
          <div className={styles.prizeBox}>
            <h3 className={styles.prizeValue}>{idea?.secondPrize}</h3>
            <div className={styles.secondPrizeBox}>
              <div className={styles.prizeBoxTitle}>2nd<br />Prize</div>
            </div>
          </div>
          {/* First prize box */}
          <div className={styles.prizeBox} style={{ margin: '0 40px' }}>
            <h3 className={styles.prizeValue}>{idea?.firstPrize}</h3>
            <div className={styles.firstPrizeBox}>
              <div className={styles.prizeBoxTitle}>1st<br />Prize</div>
              <GlowingBall
                style={{
                  bottom: '-40%'
                }}
              />
            </div>
          </div>
          {/* Third prize box */}
          <div className={styles.prizeBox}>
            <h3 className={styles.prizeValue}>{idea?.thirdPrize}</h3>
            <div className={styles.thirdPrizeBox}>
              <div className={styles.prizeBoxTitle}>3rd<br />Prize</div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '100px auto'
        }}>
          {idea?.status ? (
            <Button type="primary" className={styles.submitButton}>
              Nộp ý tưởng
            </Button>)
            : <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>* Cuộc thi đã kết thúc *</div>
          }
        </div>
        <Divider />

        <div className={styles.contestDescription}>
          <div className={styles.timeline}>
            <div className={styles.submitTime}>
              <h3>Thời gian gửi bài</h3>
              <h3>Từ <span className={styles.time}>&#9;&#9;06/09/2023</span></h3>
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

            <div className={styles.contestDetail}>
              {convertToHtml()}
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
    </ConfigProvider>
  ) : (
    <ContestNotFoundElement />
  )
}

export default ContestInfo
