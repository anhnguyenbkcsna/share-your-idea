import React, { useEffect, useState } from "react"
import FormCustomerSegment from "../../../components/FormIdeaSteps/CustomerSegment"
import FormValuePropositions from "../../../components/FormIdeaSteps/ValuePropositions"
import FormDone from "../../../components/FormIdeaSteps/Done"
import FormOverview from "../../../components/FormIdeaSteps/Overview"
import {
  localStorageStepFormat,
  userFormStepItem,
} from "../../../utils/form.constants"
import FormProgress from "../../../components/FormProgress/progress"
import CusCard from "../../../components/CusCard"
import { createNewIdea, editIdea, getAllIdeas, sendIdeaToAIServer } from "../../../api/idea"
import { useNavigate, Navigate } from "react-router-dom"
import { Modal, message } from "antd"
import styles from "./styles.module.scss"
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons"

const notificationModal = [
  {
    key: 1,
    status: "success",
    text: "Success",
    icon: <CheckCircleOutlined />,
  },
  {
    key: 2,
    status: "warning",
    text: "Warning",
    icon: <WarningOutlined />,
  },
  {
    key: 3,
    status: "error",
    text: "Error",
    icon: <CloseCircleOutlined />,
  },
]

const CreateIdeaFormPage = () => {
  // const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(false) // false, success, error, warning
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()
  const delay = (ms) => new Promise((res) => setTimeout(res, ms))

  const [currentStep, setCurrentStep] = useState(0)
  const [eachStepData, setEachStepData] = useState([])
  const [fileList, setFileList] = useState([])
  const [projectIdea, setProjectIdea] = useState({})
  const [serverAIresponse, setServerAIresponse] = useState("success")
  const [edit, setEdit] = useState(false)

  const next = (curData) => {
    localStorage.setItem("currentStep", currentStep + 1)
    handler(curData)
    setCurrentStep(currentStep + 1)
  }
  const prev = (curData) => {
    localStorage.setItem("currentStep", currentStep - 1)
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
    data.append("image", new Blob(fileList), "file_list_name")
    console.log("------- data", fileList, eachStepData)

    for (let i = 0; i < userFormStepItem.length; i++) {
      localStorage.removeItem(localStorageStepFormat(i))
    }
    localStorage.removeItem("currentStep")
  }

  useEffect(() => {
    const curStep = localStorage.getItem("currentStep")
      ? localStorage.getItem("currentStep")
      : 0
    console.log("curStep", parseInt(curStep))
    setCurrentStep(parseInt(curStep))
  }, [])
  const onFormFinish = (formObj) => {
    messageApi.open({
      type: "loading",
      content: "Đang gửi...",
    })
    
    console.log("Send idea to AI server: ", formObj)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    
    sendIdeaToAIServer(formObj).then((res) => {
      console.log(">> AI respond: ", res)
      switch (res) {
        case "VALID":
          message.success("Gửi ý tưởng thành công", 2.5)
          createNewIdea(formObj).then(res => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
          })
          delay(3000)
          // Send idea to backend server
          navigate("/innovator")
          break
        case "WARNING":
          message.warning("Ý tưởng của bạn cần được kiểm duyệt", 2.5)
          break
        case "SPAM":
          message.error("Ý tưởng của bạn không hợp lệ", 2.5)
          break
      }
    })
    .catch(() => message.error("Gửi ý tưởng thất bại", 2.5))
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
        slogans={[
          "Hãy thể hiện ý tưởng sáng tạo của bạn",
          "Bắt đầu từ bước đầu tiên!",
        ]}
        formSource={[
          FormOverview,
          FormCustomerSegment,
          FormValuePropositions,
          FormDone,
        ]}
        dataSteps={userFormStepItem}
        edit={false}
      />
    </CusCard>
  )
}

export default CreateIdeaFormPage
