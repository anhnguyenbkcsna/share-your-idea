import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Button, Input, Slider, Upload, Select } from 'antd'
import {
  gender,
  localStorageStepFormat,
  customerJobs,
  residential,
} from '../../../utils/form.constants'

const normFile = (fileList) => {
  if (Array.isArray(fileList)) {
    console.log(
      '>>>>>>  e?.fileList',
      fileList.map((file) => file.originFileObj)
    )
    return fileList.map((file) => file.originFileObj)
  }
  return fileList.map((file) => file.originFileObj)
}

const FormCustomerSegment = (props) => {
  // const { setFileList, form, name } = props

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <div>
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
        <Slider range step={1} initialValues={[20, 50]} />
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
          options={customerJobs}
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
    </div>
  )
}

export default FormCustomerSegment
