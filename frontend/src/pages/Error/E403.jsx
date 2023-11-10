import { Button, Result } from 'antd'
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function UnauthorizedPage() {
  const navigate  = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={<Button type="primary" onClick={() => navigate('/')} >Trở về trang chủ</Button>}
    />
  )
}
