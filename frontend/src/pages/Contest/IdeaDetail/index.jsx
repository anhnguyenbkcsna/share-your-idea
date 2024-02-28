import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../styles.module.scss'
import ContestCommentInput from './CommentInput'
import ContestCommentCard from './CommentCard'
import ContestCommentList from './CommentList'
import RankingBox from './Ranking'



export default function ContestIdeaDetailPage() {
  const navigate = useNavigate()
  const organizer = 'GDSC HCMC'
  const innovatorName = 'Nguyễn'
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

  return (
    <div className={styles.container}>
      <div className={styles.contestHeading}>
        {organizer}
      </div>
      <div className={styles.mediaBox}>
        Video
      </div>
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
              {innovatorName}
            </div>
          </div>

          <div className={styles.line}>
            Số lượng: 5 thành viên
          </div>
          <div className={styles.line}>
            Lĩnh vực: Công nghệ Hóa học
          </div>
          <div className={styles.line}>
            <div className={styles.ideaStatus}>
              Trạng thái dự án
            </div>
            Đã có prototype thực thi tốt trong môi trường dev
          </div>
        </div>

        <div className={styles.detail}>
          <div className={styles.ideaHeading}>
            Hệ thống phân loại tái chế
          </div>
          <div className={styles.para}>
            Tái chế và sử dụng các phế thải và sản phẩm phụ trong quá trình công nghiệp và nông nghiệp để chế tạo một
          </div>
        </div>
      </div>
      <div className={styles.evaluationWrapper}>
        <hr
          style={{ color: '#FBFBFB', marginBottom: 20 }}
        />
        <div className={styles.h2}>
          Chấm điểm
        </div>
        <div className={styles.evaluation}>
          <div className={styles.evaluationTable}>
            <div className={styles.tblItem}>Tính cấp thiết</div>
            <div className={styles.tblItem}>8</div>
            <div className={styles.tblItem}>Tính cấp thiếtTính cấp thiếtTính cấp thiếtTính cấp thiếtTính cấp thiếtTính cấp thiếtTính cấp thiết</div>
            <div className={styles.tblItem}>Tính thuyết phục</div>
            <div className={styles.tblItem}>8.4</div>
            <div className={styles.tblItem}>Tính thuyết phục</div>
            <div className={styles.tblItem}>Tính khả thi</div>
            <div className={styles.tblItem}>8.2</div>
            <div className={styles.tblItem}>Tính khả thi</div>
            <div className={styles.tblItem}>Thuyết trình</div>
            <div className={styles.tblItem}>8.9</div>
            <div className={styles.tblItem}>Thuyết trình</div>
            <div className={styles.tblItem}>Kiến thức nghiên cứu</div>
            <div className={styles.tblItem}>7</div>
            <div className={styles.tblItem}>Kiến thức nghiên cứu</div>
          </div>
          <div className={styles.point}>
            8.5
          </div>
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
            <ContestCommentList />
          </div>
        </div>
        <div className={styles.rankingWrapper}>
          <div className={styles.h2}>
            Xếp hạng
          </div>
          <RankingBox />
        </div>
      </div>
    </div >
  )
}
