import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Button, Input, Slider, Upload, Select } from 'antd'
import {
  gender,
  localStorageStepFormat,
  professionals,
  residential,
} from '../../../utils/constants'

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log('>>>>>>  e?.fileList', e?.fileList)
    return e
  }
  return e?.fileList
}

const FormCustomerSegment = (props) => {
  const { setFileList, form } = props

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
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(1))
      )}
    >
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Select
          placeholder="Please select"
          onChange={handleChange}
          options={gender}
        />
      </Form.Item>

      <Form.Item
        name="ageRange"
        label="Age Range"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Slider range step={1} defaultValue={[20, 50]} />
      </Form.Item>

      <Form.Item
        name="professional"
        label="Professionals"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Select
          mode="tags"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={professionals}
        />
      </Form.Item>

      <Form.Item
        name="geographical"
        label="Geographical"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Select
          mode="tags"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={residential}
        />
      </Form.Item>

      <Form.Item
        name="behavior"
        label="Why would this particular customer group would love your idea?"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Input.TextArea
          allowClear
          placeholder="Describe Behavioral Specification of Your Audience"
          autoSize={{ minRows: 2, maxRows: 10 }}
        />
      </Form.Item>
    </Form>
  )
}

export default FormCustomerSegment
