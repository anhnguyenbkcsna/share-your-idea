import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Button, Input, Slider, Upload, Select } from 'antd'
import { standoutReasons } from '../../../utils/constants'

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log('>>>>>>  e?.fileList', e?.fileList)
    return e
  }
  return e?.fileList
}

const FormValuePropositions = (props) => {
  const { setFileList } = props
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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{
        minWidth: 600,
        padding: '20px',
      }}
    >
      <Form.Item
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Are there any applications direct the same issue?"
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What makes your idea stand out?"
      >
        <Select
          mode="multiple"
          placeholder="Please select"
          onChange={handleChange}
          options={standoutReasons}
        />
      </Form.Item>
      <Form.Item
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
