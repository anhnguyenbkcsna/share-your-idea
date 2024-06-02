import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../styles.module.scss'
import ContestCommentInput from './CommentInput'
import ContestCommentCard from './CommentCard'
import ContestCommentList from './CommentList'
import RankingBox from './Ranking'
import { OrangeBasicButton } from '../Components/button'
import { Button, Input, Descriptions } from 'antd'
import { localStorageConstant } from '../../../utils/global.constants'
import { DiffFilled, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { contestSubmission, getContestById, getContestSubmissionMark } from '../../../api/contest'
import { getIdeaById } from '../../../api/idea'
import { getUserById } from '../../../api/user'

export default function ContestIdeaDetailPage() {
  const navigate = useNavigate()
  // const [vote, setVote] = useState('none')
  // const [like, setLike] = useState(5331)
  // const [dislike, setDislike] = useState(212)
  const [contestId, setContestId] = useState(window.location.pathname.split('/')[2])
  const [ideaId, setIdeaId] = useState(window.location.pathname.split('/')[4])
  const [contest, setContest] = useState({})
  const [idea, setIdea] = useState({})
  const [comment, setComment] = useState('')

  const [grades, setGrades] = useState([0, 0, 0, 0, 0])

  const [author, setAuthor] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const innovatorAvtUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s'

  const dataSource = [
    {
      key: '1',
      criteria: 'Mike',
      point: 32,
      comment: '10 Downing Street',
    },
    {
      key: '2',
      criteria: 'John',
      point: 42,
      comment: '10 Downing Street',
    },
  ]

  const columns = [
    {
      title: 'Tiêu chí',
      dataIndex: 'criteria',
      key: 'criteria',
    },
    {
      title: 'Điểm',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      key: 'comment',
    },
  ]

  const handleNavigateMarkPage = () => {
    let role = localStorage.getItem(localStorageConstant.ROLE)
    if (role === 'company'){
      navigate('mark')
    }
    else {
      alert('Bạn không có quyền truy cập trang này')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getContestById(contestId).then(res => {
      console.log(">> Get contest:", res)
      setContest(res)
    }).catch(err => {
      console.log(err)
    })

    getIdeaById(ideaId).then(res => {
      console.log(">> Get idea:", res)
      setIdea(res)
    }).catch(err => {
      console.log(err)
    })

    getContestSubmissionMark().then((res) => {
      console.log(contestId, ideaId)
      getContestSubmissionMark(contestId, ideaId).then(res => {
        console.log("getContestSubmissionMark", res)
        if(res.data.data.grades !== undefined){
          setGrades(res.data.data.grades)
          setComment(res.data.data.comment)
        }
      }
      ).catch(err => {
        console.log(err)
      })
    })

  }, [])

  useEffect(() => {
    getUserById(idea.innovator_id).then(res => {
      console.log(">> Get user:", res)
      setAuthor(res.name)
      setAuthorEmail(res.email)
    }).catch(err => {
      console.log(err)
    })
  }, [idea])

  return (
    <div className={styles.container}>
      <div className={styles.contestHeading}>
        {contest.name}
        <button 
          style={{
            float: 'right',
            backgroundColor: '#ff7510',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            padding: '10px 20px',
            cursor: 'pointer',
            width: 200,
            height: 50,
            fontSize: '2rem',
          }}
          onClick={handleNavigateMarkPage}
        >
          Chấm điểm
        </button>
      </div>
      <img
        className={styles.banner}
        src={"https://www.uit.edu.vn/sites/vi/files/uploads/images/thumbs/202312/khoi_nghiep_0.jpg"}
        alt="idea"
      />
      <div className={styles.mainContent}>
        <div className={styles.information}>
          <div className={styles.ideaHeading}>
            Thông tin
          </div>
          <div
            className={genericStyles.authorLine}
            style={{ marginBottom: 40 }}
          >
            <div className={genericStyles.authorAvtWrapper}>
              <img
                alt='contest'
                src={innovatorAvtUrl}
              />
            </div>
            <div className={genericStyles.authorName}>
              {author}
            </div>
          </div>

          <div className={styles.line}>
            Số lượng: {idea.teamDescription}
          </div>
          <div className={styles.line}>
            Lĩnh vực: {idea.domain}
          </div>
          <div className={styles.line}>
            <div className={styles.ideaStatus}>
              Trạng thái dự án
            </div>
            {idea.currentDev}
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.ideaHeading}>
            {idea.name}
          </div>
          <div className={styles.slogan}>
            {idea.slogan}
          </div>
          <div className={styles.para}>
            <h3 className={styles.subTitle}>
              Vấn đề
            </h3>
              {idea.problem}
          </div>
          <div className={styles.para}>
            <h3 className={styles.subTitle}>
              Giải pháp
            </h3>
              {idea.solution}
          </div>
          <div className={styles.para}>
            <h3 className={styles.subTitle}>
              Đối tượng khách hàng
            </h3>
              <Descriptions bordered style={{ marginBottom: 20 }}>
                <Descriptions.Item 
                  labelStyle={{backgroundColor: '#ddd'}}
                  contentStyle={{backgroundColor: '#eee'}}
                  label='Khu vực'
                >
                  {idea.geographical}
                </Descriptions.Item>
                <Descriptions.Item 
                  labelStyle={{backgroundColor: '#ddd'}}
                  contentStyle={{backgroundColor: '#eee'}}
                  label='Độ tuổi'
                >
                  {idea.ageRange}
                </Descriptions.Item>
                <Descriptions.Item 
                  labelStyle={{backgroundColor: '#ddd'}}
                  contentStyle={{backgroundColor: '#eee'}}
                  label='Đối tượng'
                >
                  {idea.professional}
                </Descriptions.Item>
              </Descriptions>
              {idea.behavior}
          </div>
          <div className={styles.para}>
            <h3 className={styles.subTitle}>
              Các ứng dụng tương tự
            </h3>
              {idea.apps}
          </div>
          <div className={styles.para}>
            <h3 className={styles.subTitle}>
              Điểm nổi bật của ý tưởng
            </h3>
              {idea.outstand}
          </div>
        </div>
      </div>
      <div className={styles.evaluationWrapper}>
        <hr
          style={{ color: '#FBFBFB', marginBottom: 20 }}
        />
        <h1 style={{ color: '#FF7510' }}>
          Đánh giá
        </h1>
        <div className={styles.evaluation}>
          <div className={styles.evaluationTable}>
            <div>
              <div className={styles.tblItem}>Độ sáng tạo</div>
              <div className={styles.tblItem}>Khả thi</div>
              <div className={styles.tblItem}>Độ hiệu quả</div>
              <div className={styles.tblItem}>Tính tiện ích</div>
              <div className={styles.tblItem}>Tính ứng dụng</div>
            </div>
            {grades && <div>
              <div className={styles.tblItem}>{grades[0]}</div>
              <div className={styles.tblItem}>{grades[1]}</div>
              <div className={styles.tblItem}>{grades[2]}</div>
              <div className={styles.tblItem}>{grades[3]}</div>
              <div className={styles.tblItem}>{grades[4]}</div>
            </div>}
            <div>
              <div className={styles.subTitle}>
                Nhận xét từ giám khảo
              </div>
              {comment}
            </div>
          </div>
          <h2 className={styles.point}>
            {grades?.reduce((a, b) => a + b, 0) / 5}
          </h2>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.commentWrapper}>
          <div className={styles.h2}>
            Bình luận
          </div>
          <div className={styles.commentInputWrapper}>
            <div className={styles.commentAvtWrapper}>
              <img
                alt='commentAvt'
                src={innovatorAvtUrl}
              />
            </div>
            <ContestCommentInput />
          </div>
          <div className={styles.comments}>
            {/* <ContestCommentList data={idea.comment}/> */}
          </div>
        </div>
        {/* <div className={styles.rankingWrapper}>
          <div className={styles.votingWrapper}>
            <div className={styles.votingTitle}>
              Đánh giá bài dự thi
            </div>
            <div className={styles.votingContent}>
              <Button 
                type={vote == 'like' ? 'primary' : 'default'}
                icon={vote == 'like' ? <LikeFilled /> : <LikeOutlined />} 
                onClick={() => handleVote('like')}
                className={styles.votingBtn}
              >
                {like}
              </Button>
              <Button 
                type={vote == 'dislike' ? 'primary' : 'default'}
                icon={vote == 'dislike' ? <DislikeFilled /> : <DislikeOutlined/>} 
                onClick={() => handleVote('dislike')}
                className={styles.votingBtn}
              >
                {dislike}
              </Button>
            </div>
            {vote != 'none' ? <TextArea placeholder='Nhận xét' rows={4}/> : null}
            <Button tpye='primary'  style={{ marginTop: 20 }}>
              Gửi bình chọn
            </Button>
          </div>
        </div> */}
      </div>
    </div >
  )
}
