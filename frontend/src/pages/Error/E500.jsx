import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function InternalServerErrorPage() {
  const navigate  = useNavigate()

  return (
    <Result
      status="500"
      title="500"
      subTitle="Rất tiếc, đã có lỗi xảy ra."
      extra={<Button type="primary" onClick={() => navigate('/')} >Trở về trang chủ</Button>}
    />
  )
}
