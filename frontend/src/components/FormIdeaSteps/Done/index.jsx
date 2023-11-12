import React from 'react'
import { Form, Input, Select, Upload, Row, Col, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload
const { TextArea } = Input

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log('>>>>>>  e?.fileList', e?.fileList)
    return e
  }
  return e?.fileList
}

const FormDone = (props) => {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="files"
            // rules={[{ required: true, message: 'We need your specification!' }]}
            label="Proof of work and other attachments"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Dragger
              {...props}
              // onChange={(e) => uploadFiles(e)}
              customRequest={dummyRequest}
              style={{ maxWidth: '70%' }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Nhấp chọn hoặc kéo thả tệp vào đây
              </p>
              <p className="ant-upload-hint">
                Hỗ trợ định dạng pdf, ppt, jpg, png, etc.
              </p>
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="support"
            label="Bạn cần sự hỗ trợ gì từ doanh nghiệp?"
          >
            <TextArea
              rows={3}
              showCount maxLength={100}
              allowClear
              label="Về tài chính, kỹ thuật, marketing, etc."
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default FormDone
