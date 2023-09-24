import React, { useState } from 'react'
import { Steps } from 'antd'
import { userFormStepItem } from '../../utils/constants'

const FormSteps = (props) => {
  return (
    <Steps
      direction="horizontal"
      current={props.current}
      items={userFormStepItem}
    />
  )
}

export default FormSteps
