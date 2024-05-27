import React, { useState } from 'react'
import { Button, Select } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ContestInput, ContestStartAndEndDateInput } from '../Components/input'

const roundTypes = [
  {
    value: 'upload',
    label: 'Gửi bài dự thi'
  },
  {
    value: 'online',
    label: 'Thi trực tuyến'
  },
  {
    value: 'offline',
    label: 'Thi trực tiếp'
  }
]

const scoringTypes = [
  {
    value: 'vote',
    label: 'Bình chọn'
  },
  {
    value: 'mark',
    label: 'Chấm điểm'
  }
]

export default function Round({ roundId, setData }) {
  const [roundType, setRoundType] = useState('')
  const [scoringType, setScoringType] = useState('')

  const handleRoundType = (e) => {
    setRoundType(e.key)
  }

  const handleScoringType = (e) => {
    setScoringType(e.key)
  }

  const handleOnChange = (e, fieldName) => {
    // console.log(e, fieldName)
    setData((prev) => ({ ...prev, [fieldName]: e }))
  }

  return (
    <div style={{
      border: '1px solid #000',
      borderRadius: 10,
      padding: 20,
      margin: '20px 0'
    }}>
      <ContestInput label={`Tên vòng thi ${roundId}`} setFunc={setData} fieldName={`round${roundId}`} type='text'/>
      <label style={{ fontSize: '1.7rem', color: '#000' }}>
        Hình thức thi và chấm điểm
      </label>
      <div style={{
        margin: '20px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
      }}>
        <Select 
          onClick={handleRoundType} 
          onChange={(e) => handleOnChange(e, `roundType${roundId}`)}
          fieldName={`roundType${roundId}`}
          defaultValue="Chọn loại vòng thi"
          options={roundTypes}
          style={{ width: '48%', height: 50, background: 'f5f5f5', border: '1px solid #000'}}
        />
        <Select 
          onClick={handleScoringType} 
          onChange={(e) => handleOnChange(e, `scoringType${roundId}`)}
          fieldName={`scoringType${roundId}`}
          defaultValue="Chọn hình thức chấm điểm"
          options={scoringTypes}
          style={{ width: '48%', height: 50, background: 'f5f5f5', border: '1px solid #000' }}
        />
      </div>
      <ContestStartAndEndDateInput label={'Thời gian bắt đầu và kết thúc'} setFunc={setData} fieldName={`time${roundId}`}/>

    </div>
  )
}
