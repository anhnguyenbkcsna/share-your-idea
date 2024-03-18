import React, { useEffect, useState } from 'react'
import FormCustomerSegment from '../../components/FormIdeaSteps/CustomerSegment'
import FormValuePropositions from '../../components/FormIdeaSteps/ValuePropositions'
import FormDone from '../../components/FormIdeaSteps/Done'
import FormOverview from '../../components/FormIdeaSteps/Overview'
import { localStorageStepFormat, userFormStepItem } from '../../utils/form.constants'
import FormProgress from '../../components/FormProgress/progress'
import CusCard from '../../components/CusCard'
import { createNewIdea } from '../../api/idea'
import { useNavigate, Navigate } from 'react-router-dom'
import { Modal, message } from 'antd'
import styles from './styles.module.scss'
import { CheckCircleOutlined, CloseCircleOutlined, WarningOutlined } from '@ant-design/icons'

const notificationModal = [
  {
    key: 1,
    status: 'success',
    text: 'Success',
    icon: <CheckCircleOutlined />
  },
  {
    key: 2,
    status: 'warning',
    text: 'Warning',
    icon: <WarningOutlined />
  },
  {
    key: 3,
    status: 'error',
    text: 'Error',
    icon: <CloseCircleOutlined />
  }
]

const CreateIdeaFormPage = () => {
  // const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(false) // false, success, error, warning
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()
  const delay = ms => new Promise(res => setTimeout(res, ms))

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
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      // setStatus('warning')
      warning()
    })
  }

  const handleOk = () => {
    navigate('/innovator')
  }

  const navigateToIdeaList = async () => {
    await delay(5000)
    console.log('Waited 5s')
    navigate('/innovator')
  }
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
      duration: 5,
      style: {
        marginTop: '8vh',
      },
    })
    navigateToIdeaList() // Success add idea, navigate to idea list
  }

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
      duration: 5,
      style: {
        marginTop: '8vh',
      },
    })
  }

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
      duration: 5,
      style: {
        marginTop: '8vh',
      },
    })
    navigateToIdeaList() // Add warning idea, navigate to idea list
  }

  return (
    <CusCard>
      {/* <Modal
        open={status != false}
        onOk={handleOk}
        onCancel={() => setStatus(false)}
      >
        {notificationModal.map((item) => {
          if (item.status === status) {
            return (
              <div className={styles.modalContainer}>
                <div className={styles.modalIcon}>
                  {item.icon}
                </div>
                <div>
                  <h2 className={styles.modalText}>
                    {item.text}
                  </h2>
                </div>
              </div>
            )
          }
        })}
      </Modal> */}

      {contextHolder}
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
