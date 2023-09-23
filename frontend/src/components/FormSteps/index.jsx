import React, { useState } from 'react'

import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Steps } from 'antd'

let mockItems = [
  {
    title: 'Login',
    status: 'finish',
    icon: <UserOutlined />,
  },
  {
    title: 'Customer Segments',
    status: 'finish',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Value Propositions',
    status: 'process',
    icon: <LoadingOutlined />,
  },
  {
    title: 'Done',
    status: 'wait',
    icon: <SmileOutlined />,
  },
]

const FormSteps = (props) => {
  const [stepProcess, setStepProcess] = useState(
    props.stepProcess ? props.stepProcess : mockItems
  )
  return <Steps items={stepProcess} />
}

export default FormSteps
