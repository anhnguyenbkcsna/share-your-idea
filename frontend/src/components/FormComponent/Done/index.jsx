import React from 'react'
import { Form, Input, Select, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { localStorageStepFormat } from '../../../utils/constants'
const { Dragger } = Upload;

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log('>>>>>>  e?.fileList', e?.fileList)
    return e
  }
  return e?.fileList
}

const FormDone = (props) => {
  const { setFileList, form, name } = props
  const uploadFiles = async (upload) => {
    const { file, fileList } = upload
    setFileList(fileList)
    console.log('>>>>>> file', fileList)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Form
      form={form}
      name={name}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(0))
      )}
    >
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
        <Dragger {...props} onChange={(e) => uploadFiles(e)}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
            </p>
        </Dragger>
      </Form.Item>
    </Form>
  )
}

export default FormDone
