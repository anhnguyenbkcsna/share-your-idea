import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"
import genericStyles from "../styles.module.scss"
import { Button, Input, Table } from "antd"
import { Form, InputNumber } from "antd"
import MarkItem from "./markItem"
import { postContestSubmissionMark } from "../../../api/contest"
const { TextArea } = Input

export default function MarkPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [criterias, setCriterias] = useState(['creative', 'feasibility', 'effective', 'utility', 'applicability'])
  const [averageMark, setAverageMark] = useState(0.0)
  const [vote, setVote] = useState("none")
  const [like, setLike] = useState(5331)
  const [dislike, setDislike] = useState(212)
  const organizer = "GDSC HCMC"
  const innovatorName = "Nguyễn"
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
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.contestHeading}>{organizer}</div>
      <div className={styles.mediaBox}>Video</div>
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
            <div className={genericStyles.authorName}>{innovatorName}</div>
          </div>

          <div className={styles.line}>Số lượng: 5 thành viên</div>
          <div className={styles.line}>Lĩnh vực: Công nghệ Hóa học</div>
          <div className={styles.line}>
            <div className={styles.ideaStatus}>Trạng thái dự án</div>
            Đã có prototype thực thi tốt trong môi trường dev
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.ideaHeading}>Hệ thống phân loại tái chế</div>
          <div className={styles.para}>
            Tái chế và sử dụng các phế thải và sản phẩm phụ trong quá trình công
            nghiệp và nông nghiệp để chế tạo một
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
