import React, { useEffect, useState } from 'react'
import {
  Typography,
  Form,
} from 'antd'
import FormSteps from '../../components/FormSteps'
import FormCustomerSegment from '../../components/FormComponent/CustomerSegment'
import FormValuePropositions from '../../components/FormComponent/ValuePropositions'
import FormDone from '../../components/FormComponent/Done'
import FormOverview from '../../components/FormComponent/Overview'
import { localStorageStepFormat, userFormStepItem } from '../../utils/constants'
import FormButtons from '../../components/FormButtons'

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [eachStepData, setEachStepData] = useState([])
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
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
    // const result = await fetch(
    //   'http://127.0.0.1:8000/idea/65057546c5ba16ab88f1cecc/',
    //   {
    //     method: 'POST',
    //     // headers: {
    //     //     // "Content-Type": "application/json",
    //     //     'Content-Type': 'multipart/form-data',
    //     // },
    //     body: data,
    //   }
    // ).then((res) => {
    //   console.log('>>>>>>> response', res)
    //   return res.data
    // })

    // const obj = result ? JSON.parse(result) : 'empty'
    // console.log('>>>>> obj', obj)

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

  return (
    <div>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical">
        <Typography.Title level={2}>
          {"Let's complete your project"}
        </Typography.Title>
        <Typography.Title level={2} style={{ marginBottom: '50px' }}>
          {'We will help you find the right hand!'}
        </Typography.Title>
        <FormSteps level={'hard'} current={currentStep} />

        <Typography.Title level={3}>
          {userFormStepItem[currentStep].content}
        </Typography.Title>

        {/* Content */}
        {currentStep === 0 && (
          <FormOverview
            form={form}
            name="validateOnly"
            setFileList={setFileList}
          />
        )}
        {currentStep === 1 && (
          <FormCustomerSegment
            form={form}
            name="validateOnly"
            setFileList={setFileList}
          />
        )}
        {currentStep === 2 && (
          <FormValuePropositions
            form={form}
            name="validateOnly"
            setFileList={setFileList}
          />
        )}
        {currentStep === 3 && <FormDone setFileList={setFileList} />}

        <FormButtons
          prevHandler={prev}
          nextHandler={next}
          finishForm={finishForm}
          form={form}
          steps={userFormStepItem.length}
          currentStep={currentStep}
        />
      </Form>
    </div>
  )
}

export default FormPage
