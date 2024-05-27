import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import genericStyles from '../styles.module.scss'
import { ContestStartAndEndDateInput, ContestInput, ContestTextarea } from '../Components/input'
import { OrangeBasicButton } from '../Components/button'
import { createContest } from '../../../api/contest'
import { Button, Checkbox, Upload, Alert } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Round from './round'
import { UploadOutlined } from '@ant-design/icons'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function CreateContestPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const [multipleRound, setMultipleRound] = useState(false)
  const [rounds, setRounds] = useState(1)
  const [prizes, setPrizes] = useState(1)

  const handleSubmitClick = () => {
    console.log(">> Create contest data: ", data)
    let formData = new FormData()
    for (const key in data) {
      if (data[key] !== undefined) {
        formData.append(key, data[key])
      }
    }

    createContest(formData)
      .then(res => {
        if (res?.status === 200)
        {
          // wait for 1s to make sure the contest is created

          setTimeout(() => navigate('/contest'), 1000)
        }
      })
      .catch((err) => alert(err))
  }

  const handleUploadFile = (e) => {
    console.log(">> Upload file: ", e.target.files[0])
    setData((prev) => ({ ...prev, banner: e.target.files[0] }))
  }
  const increaseRounds = () => {
    if(rounds >= 5) return
    setRounds(1 + rounds)
  }
  const increasePrizes = () => {
    if(prizes >= 5) return
    setPrizes(1 + prizes)
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
        Tạo cuộc thi
      </h1>
      <div className={styles.inputContainer}>
        <div className={styles.left}>
          <h2
            className={genericStyles.contestHeading}
            style={{
              fontSize: '3rem',
              marginBottom: 75
            }}
          >
            Thông tin cuộc thi
          </h2>
          <ContestInput label={'Tên cuộc thi'} setFunc={setData} fieldName={'name'} type='text'/>
          <ContestInput label={'Chủ đề'} setFunc={setData} fieldName={'topic'} type='text'/>
          <ContestInput label={'Địa điểm tổ chức'} setFunc={setData} fieldName={'location'} type='text'/>
          <ContestInput label={'Thông tin thêm'} setFunc={setData} fieldName={'otherInfo'} type='text'/>
          {/* <ContestInput label={'Ảnh banner cuộc thi (1920x640)'} setFunc={setData} fieldName={'banner'} type='file'/> */}
          <input type="file" id="myFile" name="filename" onChange={handleUploadFile}/>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <label style={{ fontSize: '1.7rem', color: '#000' }}>
              Cơ cấu giải thưởng
            </label>
            <Button type='primary' style={{ width: 50, height: 50, borderRadius: 16 }} onClick={increasePrizes}>
              <PlusOutlined />
            </Button>
          </div>
          {prizes >= 5 && <Alert message="Số giải thưởng tối đa là 5 giải" type="error" showIcon style={{
            marginTop: 10,
          }}/>}
          {[...Array(prizes)].map((_, index) => 
            <div style={{
              display: 'grid',
              alignItems: 'center',
              gap: 10,
              gridTemplateColumns: '3fr 1fr 1fr',
            }}>
              <ContestInput label={'Tên giải'} setFunc={setData} fieldName={`prize${index+1}`} />
              <ContestInput label={'Giá trị'} setFunc={setData} fieldName={`prize${index+1}Value`} />
              <ContestInput label={'Số lượng'} setFunc={setData} fieldName={`prize${index+1}Quantity`} />
            </div>
          )}
        </div>
        <div className={styles.right}>
          <h2
            className={genericStyles.contestHeading}
            style={{
              fontSize: '3rem',
            }}
          >
            Các vòng thi
          </h2>
          <div style={{ 
            height: 50,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Checkbox onChange={() => setMultipleRound(!multipleRound)}  >
              Cuộc thi nhiều vòng
            </Checkbox>
            {multipleRound && 
              <Button type='primary' onClick={increaseRounds} style={{ width: 200, height: 50, borderRadius: 16}}>
                Thêm vòng
              </Button>
            }
          </div>
          {rounds >= 5 && <Alert message="Số vòng thi tối đa là 5 vòng" type="error" showIcon style={{
            marginTop: 10,
          }}/>}

          <Round roundId={1} setData={setData}/>
          {rounds > 1 && Array.from({ length: rounds - 1 }).map((_, index) => 
            <Round key={index} roundId={index + 2} setData={setData}/>)
          }


          {/* <div
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
          <ContestInput label={'Hội đồng tổ chức'} setFunc={setData} fieldName={'organizer'} type='text'/>
          <ContestInput label={'Gmail giám khảo (cách nhau bởi dấu ",")'} setFunc={setData} fieldName={'judge'} type='text'/>
          <ContestInput label={'Thông tin liên hệ'} setFunc={setData} type='email' fieldName={'email'} />
          <ContestInput label={'Đối tượng tham gia'} setFunc={setData} fieldName={'contestant'} />
          <ContestInput label={'Hình thức dự thi'} setFunc={setData} fieldName={'teamFormat'} />
          <ContestStartAndEndDateInput
            label={'Thời gian dự kiến diễn ra vòng 2'}
            setFunc={setData}
            fieldName={'round2Time'} />
          <ContestStartAndEndDateInput
            label={'Thời gian dự kiến diễn ra vòng chung kết'}
            setFunc={setData}
            fieldName={'round3Time'} /> */}
          
        </div>
        <div className={styles.bottom}>
          <ContestTextarea label={'Mô tả cụ thể'} setFunc={setData} fieldName={'description'} type='text'/>
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
