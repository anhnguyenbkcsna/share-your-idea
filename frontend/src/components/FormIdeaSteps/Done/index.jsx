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
  // const { setFileList } = props
  console.log('FormDone')

  const uploadFiles = async (upload) => {
    const { file, fileList } = upload
    // setFileList(fileList)
    console.log('>>>>>> file ', fileList)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="upload"
            rules={[{ required: true, message: 'We need your specification!' }]}
            label="Upload your project file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            {/* <Upload listType="picture-card" onChange={(e) => uploadFiles(e)}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload> */}
            <Dragger
              {...props}
              onChange={(e) => uploadFiles(e)}
              style={{ maxWidth: '70%' }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for pdf, ppt, jpg, png, etc.
              </p>
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="support"
            label="What support do you need from enterprise?"
          >
            <TextArea
              rows={3}
              showCount maxLength={100}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default FormDone
