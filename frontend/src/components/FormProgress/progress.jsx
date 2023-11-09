import { Form, Typography } from 'antd'
import React from 'react'
import { useState } from 'react'
import SingleFormProgress from '.'
import { localStorageStepFormat } from '../../utils/form.constants'
import FormSlogan from '../FormIdeaSteps/Title'
import ProgressBar from '../ProgressBar'

// formSource should be () => React.JSX.Element with props.children passed

const FormProgress = (props) => {
  const {onFormFinish, formSource, dataSteps, slogans} = props
  const [currentStep, setCurrentStep] = useState(0)
  const [eachStepData, setEachStepData] = useState([])
  const [projectIdea, setProjectIdea] = useState({})

  const next = (curData) => {
    localStorage.setItem('currentStep', currentStep + 1)
    handler(curData)
    setCurrentStep(currentStep + 1)
    setProjectIdea(curData)
  }
  const prev = (curData) => {
    localStorage.setItem('currentStep', currentStep - 1)
    handler(curData)
    setCurrentStep(currentStep - 1)
    setProjectIdea(curData)
  }

  const done = (val) => {
    setProjectIdea(val)
    console.log('** Progress done!')
    for (let stepCount = 0; stepCount < dataSteps.length; stepCount += 1) {
      localStorage.removeItem(localStorageStepFormat(stepCount))
    }
  }

  const lastStep = currentStep === formSource.length - 1
  const handler = (curData) => {
    const dataKey = localStorageStepFormat(currentStep)
    localStorage.setItem(dataKey, JSON.stringify(curData))

    let copyStepData = eachStepData
    if (copyStepData.findIndex((item) => item === dataKey) === -1) {
      copyStepData.push({
        dataKey: curData,
      })
    } else {
      copyStepData[dataKey] = curData
    }
    setEachStepData(copyStepData)
  }

  const eachFormSubmit = (name, formInfo) => {
    console.log('** formInfo', formInfo.forms, name)
    // formInfo.forms
    if (lastStep) {
      onFormFinish(name, formInfo)
    }
  }

  return (
    <Form.Provider onFormFinish={eachFormSubmit}>
      <FormSlogan sloganList={slogans} />
      <ProgressBar level={'hard'} current={currentStep} dataSteps={dataSteps}/>
      <Typography.Title level={3}>
        {dataSteps[currentStep].content}
      </Typography.Title>
      <SingleFormProgress
        name={'step' + currentStep}
        first={currentStep === 0}
        last={lastStep}
        next={next}
        prev={prev}
        done={done}
        key={currentStep}
      >{formSource[currentStep]().props.children}
      </SingleFormProgress>
    </Form.Provider>
  )
}

export default FormProgress
