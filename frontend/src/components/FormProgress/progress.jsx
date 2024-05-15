import { Form, Typography } from 'antd'
import React from 'react'
import { useState } from 'react'
import SingleFormProgress from '.'
import { localStorageStepFormat } from '../../utils/form.constants'
import FormSlogan from '../FormIdeaSteps/Title'
import ProgressBar from '../ProgressBar'

// formSource should be () => React.JSX.Element with props.children passed

const FormProgress = (props) => {
  const {onFormFinish, formSource, dataSteps, slogans, edit} = props
  const [currentStep, setCurrentStep] = useState(0)
  const [eachStepData, setEachStepData] = useState([])

  const next = (curData) => {
    localStorage.setItem('currentStep', currentStep + 1)
    handler(curData)
    setCurrentStep(currentStep + 1)
  }
  const prev = (curData) => {
    localStorage.setItem('currentStep', currentStep - 1)
    handler(curData)
    setCurrentStep(currentStep - 1)
  }

  const done = (val) => {
    if (val.upload) {
      let uploadFiles = val.upload.map(item => (item.originFileObj))
      val.upload = uploadFiles
    }
    handler(val)
    for (let stepCount = 0; stepCount < dataSteps.length; stepCount += 1) {
      localStorage.removeItem(localStorageStepFormat(stepCount))
    }
  }

  const lastStep = currentStep === formSource.length - 1
  const handler = (curData) => {
    const dataKey = localStorageStepFormat(currentStep)
    localStorage.setItem(dataKey, JSON.stringify(curData))

    let copyStepData = eachStepData
    copyStepData[dataKey] = curData
    // console.log('>>> Step Data', copyStepData)
  }

  const eachFormSubmit = () => {
    let mergeData = {}
    mergeData = Object.assign(mergeData, ...Object.values(eachStepData))
    onFormFinish(mergeData)
  }

  return (
    <Form.Provider onFormFinish={() => eachFormSubmit()}>
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
        edit={edit}
        key={currentStep}
      >{formSource[currentStep]().props.children}
      </SingleFormProgress>
    </Form.Provider>
  )
}

export default FormProgress
