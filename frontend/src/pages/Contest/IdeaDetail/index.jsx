import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../styles.module.scss'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function ContestIdeaDetailPage() {
  const navigate = useNavigate()
  const organizer = 'GDSC HCMC'
  const innovatorName = 'Nguyễn'
  const innovatorAvtUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s'

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
      <div className={styles.evaluation}>
        a
      </div>
    </div >
  )
}
