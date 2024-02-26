import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../index.module.scss'
import { ContestInput } from './input'
import { OrangeBasicButton } from './button'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function CreateContestPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({})

  useEffect(() => {
    console.log(data)
  }, [data])

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
          <ContestInput label={'Tên cuộc thi'} setFunc={setData} fieldName={'name'} />
          <ContestInput label={'Hạn chót nộp đề tài'} setFunc={setData} fieldName={'deadline'} type={'date'} />
          <ContestInput label={'Chủ đề'} setFunc={setData} fieldName={'topic'}/>
          <ContestInput label={'Mô tả cụ thể'} setFunc={setData} fieldName={'description'} />
          <ContestInput label={'Thông tin thêm'} setFunc={setData} fieldName={'moreInfo'} />

          <OrangeBasicButton style={{ marginBottom: 90 }} text='Create'/>
        </div>
        <div className={styles.right}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%'
            }}
          >
            <ContestInput label={'Giải nhất'} width='100%' setFunc={setData} fieldName={'firstPrize'}/>
            <ContestInput
              label={'Giải nhì'}
              width='100%'
              style={{ marginLeft: '10%' }}
              setFunc={setData}
              fieldName={'secondPrize'} />
            <ContestInput
              label={'Giải ba'}
              width='100%'
              style={{ marginLeft: '10%' }}
              setFunc={setData}
              fieldName={'thirdPrize'} />
          </div>
          <ContestInput label={'Hội đồng tổ chức'} setFunc={setData} fieldName={'organizer'} />
          <ContestInput
            label={'Email liên hệ'}
            setFunc={setData}
            type='email'
            fieldName={'email'} />
          <ContestInput
            label={'Thời gian dự kiến diễn ra vòng 2'}
            setFunc={setData}
            type='date'
            fieldName={'round2Time'} />
          <ContestInput
            label={'Thời gian dự kiến diễn ra vòng chung kết'}
            setFunc={setData}
            type='date'
            fieldName={'finalRoundTime'}
          />
        </div>
      </div>
    </div>
  )
}
