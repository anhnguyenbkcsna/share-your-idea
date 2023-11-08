import React from 'react'
import { Steps } from 'antd'

const ProgressBar = (props) => {
  const {dataSteps} = props
  return (
    <Steps
      direction="horizontal"
      current={props.current}
      items={dataSteps}
    />
  )
}

export default ProgressBar
