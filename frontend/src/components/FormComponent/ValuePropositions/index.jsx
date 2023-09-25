import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Button, Input, Slider, Upload, Select } from 'antd'
import {
  localStorageStepFormat,
  standoutReasons,
} from '../../../utils/constants'

const normFile = (fileList) => {
  console.log('file', fileList)
  if (Array.isArray(fileList)) {
    console.log(
      '>>>>>>  e?.fileList',
      fileList.map((file) => file.originFileObj)
    )
    // return fileList.map((file) => file.originFileObj)
    return new Blob(fileList.map((file) => file.originFileObj))
  }
  // return fileList.map((file) => file.originFileObj)
  return fileList ? fileList : []
}

const FormValuePropositions = (props) => {
  const { setFileList, form } = props
  const uploadFiles = async (upload) => {
    const { file, fileList } = upload
    if (fileList) {
      setFileList(fileList.map((file) => file.originFileObj))
      console.log(
        '>>>>>> file',
        fileList.map((file) => file.originFileObj)
      )
    }
  }

  const handleChange = (value) => {
    console.log(`Value Prop selected ${value}`)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(2))
      )}
    >
      <Form.Item
        name="apps"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Are there any applications direct the same issue?"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="outstand"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What makes your idea stand out?"
      >
        <Select
          mode="tags"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={standoutReasons}
        />
      </Form.Item>
      <Form.Item
        name="fileUpload"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card" onChange={(e) => uploadFiles(e)}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </Form>
  )
}

export default FormValuePropositions
