import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"
import genericStyles from "../styles.module.scss"
import { Button, Input, message, Table } from "antd"
import { Form, Descriptions } from "antd"
import MarkItem from "./markItem"
import { postContestSubmissionMark } from "../../../api/contest"
import { getIdeaById } from "../../../api/idea"
import { getContestById, getContestSubmissionMark } from "../../../api/contest"

const { TextArea } = Input

export default function MarkPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [criterias, setCriterias] = useState(['creative', 'feasibility', 'effective', 'utility', 'applicability'])
  const [idea, setIdea] = useState({})
  const [contestId, setContestId] = useState(window.location.pathname.split('/')[2])
  const [ideaId, setIdeaId] = useState(window.location.pathname.split('/')[4])
  
  const [contest, setContest] = useState({})
  const [comment, setComment] = useState('')

  const [grades, setGrades] = useState([0,0,0,0,0])

  const [author, setAuthor] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const innovatorAvtUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s"

  const dataSource = [
    {
      key: "1",
      criteria: "Mike",
      point: 32,
      comment: "10 Downing Street",
    },
    {
      key: "2",
      criteria: "John",
      point: 42,
      comment: "10 Downing Street",
    },
  ]

  const columns = [
    {
      title: "Tiêu chí",
      dataIndex: "criteria",
      key: "criteria",
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Nhận xét",
      dataIndex: "comment",
      key: "comment",
    },
  ]

  const onFinish = (values) => {
    const grades = [values.creative, values.feasibility, values.effective, values.utility, values.applicability]
    const ideaId = window.location.pathname.split("/")[4]
    const contestId = window.location.pathname.split("/")[2]
    const comment = values.comment

    let obj = {
      idea_id: ideaId,
      grades: grades,
      comment: comment,
    }

    console.log(values)
    postContestSubmissionMark(obj, contestId).then((res) => {
      console.log(res)
      message.success("Đã gửi điểm")
      // wait 1 sec
      setTimeout(() => {
        navigate(`/contest/${contestId}/ideas/${ideaId}`)
      }, 1000)

    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getContestById(contestId).then(res => {
      console.log(">> Get contest:", res)
      setContest(res)
    }).catch(err => {
      console.log(err)
    })
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
        if(res.data.data.grades === null) {
        //   setGrades([0,0,0,0,0])
        // }
        // else {
          setGrades(res.data.data.grades)
          setComment(res.data.data.comment)
        }
      }
      ).catch(err => {
        console.log(err)
      })
    })

  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.contestHeading}>
          {contest?.name}
      </div>
      {/* <div className={styles.mediaBox}>Video</div> */}
      {console.log(contest)}
      <img
        className={styles.banner}
        src={"https://www.uit.edu.vn/sites/vi/files/uploads/images/thumbs/202312/khoi_nghiep_0.jpg"}
        alt="idea"
      />
      <div className={styles.mainContent}>
        <div className={styles.information}>
          <div className={styles.ideaHeading}>Thông tin</div>
          <div
            className={genericStyles.authorLine}
            style={{ marginBottom: 40 }}
          >
            <div className={genericStyles.authorAvtWrapper}>
              <img alt="contest" src={innovatorAvtUrl} />
            </div>
            <div className={genericStyles.authorName}>{author}</div>
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
      <div className={styles.markWrapper}>
        <hr style={{ color: "#FBFBFB", marginBottom: 20 }} />
        <h1 className={styles.markHeading}>Chấm điểm</h1>
        <div className={styles.mark}>
          <Form
            form={form}
            style={{
              minWidth: 1000,
            }}
            onFinish={onFinish}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 500,
              }}>
                <MarkItem criteria="Độ sáng tạo" formName="creative" />
                <MarkItem criteria="Khả thi" formName="feasibility" />
                <MarkItem criteria="Hiệu quả" formName="effective" />
                <MarkItem criteria="Tính tiện ích" formName="utility" />
                <MarkItem criteria="Tính ứng dụng" formName="applicability" />
              </div>
              <Form.Item
                name="comment"
              >
                <TextArea placeholder="Nhận xét" autoSize={{
                  minRows: 11
                }}
                  style={{
                    minWidth: 600,
                  }}
                />
              </Form.Item>
            </div>
            <Button type="primary" style={{ width: 200, height: 50, display: "flex", justifyContent: 'center', paddingTop: 15 }} htmlType="submit">
              Gửi điểm
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
