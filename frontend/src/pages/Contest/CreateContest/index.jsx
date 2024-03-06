import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../styles.module.scss'
import { ContestInput, ContestTextarea } from '../Components/input'
import { OrangeBasicButton } from '../Components/button'
import { createContest } from '../../../api/contest'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function CreateContestPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const handleSubmitClick = () => {
    createContest(data)
      .then(res => {
        if (res.status === 200)
        {
          navigate('/')
        }
      })
  }

  return (
    <div
      style={{
        padding: '0 78px',
      }}
    >
      <h1
        className={genericStyles.contestHeading}
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
          <ContestInput label={'Tên cuộc thi'} setFunc={setData} fieldName={'name'} />
          <ContestInput label={'Hạn chót nộp đề tài'} setFunc={setData} fieldName={'deadline'} type={'date'} />
          <ContestInput label={'Chủ đề'} setFunc={setData} fieldName={'topic'} />
          <ContestInput label={'Địa điểm tổ chức'} setFunc={setData} fieldName={'location'} />
          <ContestInput label={'Thông tin thêm'} setFunc={setData} fieldName={'otherInfo'} />
        </div>
        <div className={styles.right}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <ContestInput
              label={'Giải nhất'}
              setFunc={setData}
              fieldName={'firstPrize'} />
            <ContestInput
              label={'Giải nhì'}
              style={{ marginLeft: '10%' }}
              setFunc={setData}
              fieldName={'secondPrize'} />
            <ContestInput
              label={'Giải ba'}
              style={{ marginLeft: '10%' }}
              setFunc={setData}
              fieldName={'thirdPrize'} />
          </div>
          <ContestInput label={'Hội đồng tổ chức'} setFunc={setData} fieldName={'organizer'} />
          <ContestInput label={'Email liên hệ'} setFunc={setData} type='email' fieldName={'email'} />
          {/* <ContestInput label={'Đối tượng tham gia'} setFunc={setData} fieldName={'contestant'} />
          <ContestInput label={'Hình thức dự thi'} setFunc={setData} fieldName={'teamFormat'} /> */}
          <ContestInput
            label={'Thời gian dự kiến diễn ra vòng 2'}
            setFunc={setData}
            type='date'
            fieldName={'round2Time'} />
          <ContestInput
            label={'Thời gian dự kiến diễn ra vòng chung kết'}
            setFunc={setData}
            type='date'
            fieldName={'round3Time'}
          />
        </div>
        <div className={styles.bottom}>
          <ContestTextarea label={'Mô tả cụ thể'} setFunc={setData} fieldName={'description'} />
        </div>
        <OrangeBasicButton
          style={{ marginBottom: 90 }}
          onClick={handleSubmitClick}
          text='Tạo cuộc thi'
        />
      </div>
    </div>
  )
}
