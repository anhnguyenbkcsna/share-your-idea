import React, { useEffect, useState } from "react"
import {
  createGoogleMeetEvent,
  initGoogleClient,
  signIn,
  isSignedIn,
} from "../../services/meet"
import {
  Button,
  Form,
  Input,
  DatePicker,
  Divider,
  ConfigProvider,
  Space,
  Modal
} from "antd"
import "./styles.css"
import viVN from "antd/lib/locale/vi_VN"
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
const TextArea = Input.TextArea
export default function MeetPage() {
  const [signedIn, setSignedIn] = useState(false)
  const [done, setDone] = useState(false)

  const [event, setEvent] = useState({})

  const handleCreateEvent = async () => {
    console.log("Creating Google Meet event...")
    // const event = {
    //     summary: "Google Meet Test Event",
    //     description: "A test event with Google Meet link",
    //     start: "2024-05-23T10:00:00-07:00",
    //     end: "2024-05-23T11:00:00-07:00",
    // }

    // try {
    //     const response = await createGoogleMeetEvent(event)
    //     console.log("Event created:", response)
    // } catch (error) {
    //     console.error("Error creating event:", error)
    // }
  }

  const handleSignIn = () => {
    signIn().then(() => {
      setSignedIn(isSignedIn())
    })
  }
  const handleOk = () => {
    setDone(false)
  }
  const handleCancel = () => {
    setDone(false)
  }
  const handleFinish = async (event) => {
    for (let key in event) {
      event[key] = event[key] ?? ""
    }
    console.log(event)

    try {
      const response = await createGoogleMeetEvent(event)
      console.log("Event created:", response)
      setEvent(response.result)
      setDone(true)
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  useEffect(() => {
    initGoogleClient()
  }, [])

  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#f08080",
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "5rem",
        }}
      >
        Tạo lịch Google Meet
      </h1>
      <div>
        {!signedIn && !done && (
          <>
            <h3
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "5rem",
              }}
            >
              Đăng nhập lại để tiếp tục
            </h3>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "50%",
                transform: "translateX(-50%)",
                height: "50px",
                width: "100px",
                backgroundColor: "#f08080",
                borderRadius: "10px",
              }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </>
        )}
      </div>
      {signedIn && !done && (
        <div>
          <ConfigProvider locale={viVN}>
            <Form onFinish={handleFinish} {...layout}>
              <Form.Item
                name="attendees"
                label="Người tham dự"
                required
                rules={[
                  {
                    type: "string",
                    min: 10,
                  },
                ]}
              >
                <TextArea placeholder="foo@gmail.com" 
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
              <Form.Item
                name="summary"
                label="Tên sự kiện"
                required
                rules={[
                  {
                    type: "string",
                    min: 10,
                  },
                ]}
              >
                <Input placeholder="Gọi vốn cho ý tưởng" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    type: "string",
                    min: 10,
                  },
                ]}
                autoSize={{ minRows: 3 }}
              >
                <Input placeholder="Mô tả cho sự kiện gọi vốn" />
              </Form.Item>
              <Form.Item name="start" label="Ngày giờ bắt đầu" required>
                <DatePicker
                  disabledDate={(current) => current < new Date()}
                  name="start"
                  showNow
                  format="YYYY-MM-DD HH:mm"
                  showTime={{
                    format: "HH:mm",
                  }}
                />
              </Form.Item>
              <Form.Item name="end" label="Ngày giờ kết thúc" required>
                <DatePicker
                  disabledDate={(current) => current < new Date()}
                  name="end"
                  format="YYYY-MM-DD HH:mm"
                  showTime={{
                    format: "HH:mm",
                  }}
                  showNow
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginLeft: "50%",
                  transform: "translateX(-50%)",
                  height: "50px",
                  width: "100px",
                  backgroundColor: "#f08080",
                  borderRadius: "10px",
                }}
              >
                Submit
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      )}
      {done && (
        <div style={{
          textAlign: "center",
          marginTop: "5rem",
          width: "50%",
          margin: "0 auto",
        }}>
          <Divider />
          <h2>Thông tin sự kiện</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 3fr",
              textAlign: "left",
            }}
          >
            <h3>Tên sự kiện: </h3>
            <h3>{event?.summary}</h3>
            <h3>Mô tả: </h3>
            <h3>{event?.description}</h3>
            <h3>Đường dẫn cuộc họp: </h3>
            <h3>
              <a href={event?.hangoutLink} target="_blank">
                {event?.hangoutLink}
              </a>
            </h3>
            <h3>Ngày giờ bắt đầu: </h3>
            <h3>{event?.start?.dateTime}</h3>
            <h3>Ngày giờ kết thúc: </h3>
            <h3>{event?.end?.dateTime}</h3>
            <h3>Người tổ chức: </h3>
            <h3>{event?.creator?.email}</h3>
            <h3>Người tham dự: </h3>
            <h3>{event?.attendees?.map((attendee) => attendee.email).join(", ")}</h3>
          </div>
        </div>
      )}
    </div>
  )
}
