import React from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../index.module.scss'
import { ContestInput } from './input'
import { OrangeBasicButton } from './button'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function CreateContestPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        padding: '0 78px',
      }}
    >
      <h1
        className={genericStyles.contestHeader}
        style={{
          marginTop: 60,
          fontSize: '5rem',
          marginBottom: 40
        }}
      >
        NEW CONTEST
      </h1>
      <div className={styles.inputContainer}>
        <div className={styles.left}>
          <ContestInput label={'Tên cuộc thi'} />
          <ContestInput label={'Hạn chót nộp đề tài'} />
          <ContestInput label={'Chủ đề'} />
          <ContestInput label={'Mô tả cụ thể'} />
          <ContestInput label={'Thông tin thêm'} />

          <OrangeBasicButton style={{ marginBottom: 90 }}/>
        </div>
        <div className={styles.right}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%'
            }}
          >
            <ContestInput label={'Giải nhất'} width='100%' />
            <ContestInput label={'Giải nhì'} width='100%' style={{ marginLeft: '10%' }} />
            <ContestInput label={'Giải ba'} width='100%' style={{ marginLeft: '10%' }}  />
          </div>
          <ContestInput label={'Hội đồng tổ chức'} />
          <ContestInput label={'Email liên hệ'} />
          <ContestInput label={'Thời gian dự kiến diễn ra vòng 2'} />
          <ContestInput label={'Thời gian dự kiến diễn ra vòng chung kết'} />
        </div>
      </div>
    </div>
  )
}
