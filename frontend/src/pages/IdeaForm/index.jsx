import React, { useEffect, useState } from 'react'
import FormCustomerSegment from '../../components/FormIdeaSteps/CustomerSegment'
import FormValuePropositions from '../../components/FormIdeaSteps/ValuePropositions'
import FormDone from '../../components/FormIdeaSteps/Done'
import FormOverview from '../../components/FormIdeaSteps/Overview'
import { localStorageStepFormat, userFormStepItem } from '../../utils/form.constants'
import FormProgress from '../../components/FormProgress/progress'
import CusCard from '../../components/CusCard'
import { createNewIdea } from '../../api/idea'
import { Navigate } from 'react-router-dom'

const CreateIdeaFormPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [eachStepData, setEachStepData] = useState([])
  const [fileList, setFileList] = useState([])
  const [projectIdea, setProjectIdea] = useState({})
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

  const finishForm = async () => {
    const data = new FormData()
    data.append('image', new Blob(fileList), 'file_list_name')
    console.log('------- data', fileList, eachStepData)

    for (let i = 0; i < userFormStepItem.length; i++) {
      localStorage.removeItem(localStorageStepFormat(i))
    }
    localStorage.removeItem('currentStep')
  }

  useEffect(() => {
    const curStep = localStorage.getItem('currentStep')
      ? localStorage.getItem('currentStep')
      : 0
    console.log('curStep', parseInt(curStep))
    setCurrentStep(parseInt(curStep))
  }, [])

  const onFormFinish = (formObj) => {
    createNewIdea(formObj).then(res => {
      <Navigate to='/' />
    })
  }

  return (
    <CusCard>
      <FormProgress
        onFormFinish={onFormFinish}
        slogans={['We are helping you', 'Your idea is awesome']}
        formSource={[FormOverview, FormCustomerSegment, FormValuePropositions, FormDone]}
        dataSteps={userFormStepItem}
      />
    </CusCard>
  )
}

export default CreateIdeaFormPage
