import { Button, Result } from 'antd'
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function UnauthorizedPage() {
  const navigate  = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={() => navigate('/')} >Back Home</Button>}
    />
  )
}
