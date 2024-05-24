import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button, Divider, ConfigProvider, Flex, theme, Modal } from 'antd'
import { useParams } from 'react-router-dom'
import { getContestById } from '../../../api/contest'
import { ContestNotFoundElement } from '../Components/error'
import { GlowingBall } from '../Components/glowingBall'
import Parser from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import SubmittedIdeasPage from '../SubmittedIdeas'
import { HrHeading } from '../Components/hrheading'
import MyIdeaList from './myIdeaList'
import { getAllIdeas } from '../../../api/idea'

const ContestInfo = () => {
  const navigate = useNavigate()
  const [idea, setIdea] = useState()
  const [contest, setContest] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [yourSubmit, setYourSubmit] = useState()

  const [submissions, setSubmissions] = useState(0)
  const [vote, setVote] = useState(23142)

  const { contestId } = useParams()

  useEffect(() => {
    getContestById(contestId)
      .then(res => {
        console.log(res)
        setContest(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const fetchIdea = async () => {
      let ideas = await getAllIdeas()
      console.log('>> ideas', ideas)
      setFetchIdeas(ideas)
    }
    fetchIdea()
  }, [isModalOpen])

  const convertToHtml = () => {
    let res = ''
    try
    {
      res = Parser(contest?.description)
    }
    catch (e)
    {
      res = contest?.description
    }
    return res
  }

  const handleSubmitIdea = () => {
    // navigate('/innovator')
    // window.scrollTo(0, 0)
    setIsModalOpen(true)
  }

  const handleOk = () => {
    console.log('>>> Submit idea', yourSubmit)
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

   const dateToString = (date) => {
    return new Date(date).toLocaleDateString('vi-VN')
   }

   useEffect(() => {
    contest && setSubmissions(contest.submission_list ? contest. submission_list.length : 0)
    console.log('>> contest', contest)
   }, [contest])

  return contest ? (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Play',
        },
      }}
    >
      <Modal 
        title="Nộp ý tưởng" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Nộp bài
          </Button>,
        ]}
        width={800}
      >
        { fetchIdeas.length > 0 ? 
          <MyIdeaList fetchIdeas={fetchIdeas} submissions={yourSubmit} setSubmissions={setYourSubmit} />
          : <Button type="primary" onClick={() => navigate('/innovator/idea')}
              style={{ width: 200 }}
          >
            Thêm ý tưởng
          </Button>
        }
      </Modal>
      <img
        className={styles.banner}
        src="https://www.pvoil.com.vn/Data/Sites/1/media/tinpvoil/2021/20210924-p1.jpg"
        alt="Banner"
      />
      <div className={styles.container}>
        <h1 className={styles.contestName}>{contest?.name}</h1>

        {/* Contest Prize */}
        

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '70px auto'
        }}>
          {!contest?.status ? (
            <Button
              type="primary"
              onClick={handleSubmitIdea}
              className={styles.submitButton}>
              Nộp ý tưởng
            </Button>)
            : <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>* Cuộc thi đã kết thúc *</div>
          }
        </div>
        <Divider />

        <HrHeading title="Thông tin cuộc thi" />
        <div className={styles.contestDescription}>
          <div className={styles.timeline}>
            <div>
              <h3>Số bài dự thi </h3>
              <h3><span className={styles.time}>{submissions}</span></h3>
            </div>

            <div className={styles.contestDetail}>
              {convertToHtml()}
            </div>
          </div>

          <div className={styles.description}>
            <h3>Danh sách vòng thi</h3>
            {contest.round1 && <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                {contest.round1}
              </p></a>
              <p>Hình thức: {contest.scoringType1 === 'mark' ? "Chấm điểm" : "Bình chọn"}</p>
              <span className={styles.roundDescription}>
                {dateToString(contest.time1["start"])} - {dateToString(contest.time1["end"])}
              </span>
            </div>}
            {contest.round2 && <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                {contest.round2}
              </p></a>
              <p>Hình thức: {contest.scoringType2 === 'mark' ? "Chấm điểm" : "Bình chọn"}</p>
              <span className={styles.roundDescription}>
                {dateToString(contest.time2["start"])} - {dateToString(contest.time2["end"])}
              </span>
            </div>}
            {contest.round3 && <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                {contest.round3}
              </p></a>
              <p>Hình thức: {contest.scoringType3 === 'mark' ? "Chấm điểm" : "Bình chọn"}</p>
              <span className={styles.roundDescription}>
                {dateToString(contest.time3["start"])} - {dateToString(contest.time3["end"])}
              </span>
            </div>}
            {contest.round4 && <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                {contest.round4}
              </p></a>
              <p>Hình thức: {contest.scoringType4 === 'mark' ? "Chấm điểm" : "Bình chọn"}</p>
              <span className={styles.roundDescription}>
                {dateToString(contest.time4["start"])} - {dateToString(contest.time4["end"])}
              </span>
            </div>}
            {contest.round5 && <div className={styles.roundCard}>
              <a className={styles.roundTitle}><p>
                {contest.round5}
              </p></a>
              <p>Hình thức: {contest.scoringType5 === 'mark' ? "Chấm điểm" : "Bình chọn"}</p>
              <span className={styles.roundDescription}>
                {dateToString(contest.time5["start"])} - {dateToString(contest.time5["end"])}
              </span>
            </div>}
            
            
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <HrHeading title="Các bài dự thi" />
          <Button type="primary" onClick={() => navigate('submit')} style={{
            height: 50,
            borderRadius: 10,
          }}>
            Xem tất cả
          </Button>
        </div>
        <SubmittedIdeasPage submissionsList={contest.submissions_list}/>
      </div>
    </ConfigProvider>
  ) : (
    <ContestNotFoundElement />
  )
}

export default ContestInfo
