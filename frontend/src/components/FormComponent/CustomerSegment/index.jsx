import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Button, Input, Slider, Upload, Select } from 'antd'
import { gender, professionals, residential } from '../../../utils/constants'

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log('>>>>>>  e?.fileList', e?.fileList)
    return e
  }
  return e?.fileList
}

const FormCustomerSegment = (props) => {
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
      layout="vertical"
      style={{
        minWidth: 600,
      }}
    >
      <Form.Item
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
        label="Age Range"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Slider range step={1} defaultValue={[20, 50]} />
      </Form.Item>

      <Form.Item label="Profession">
        <Select
          mode="multiple"
          placeholder="Please select"
          onChange={handleChange}
          options={residential}
        />
      </Form.Item>

      <Form.Item
        label="Geographical"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Select
          mode="multiple"
          placeholder="Please select"
          onChange={handleChange}
          options={professionals}
        />
      </Form.Item>

      <Form.Item
        label="Why would this particular customer group would love your idea?"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <Input aria-rowcount={4} />
      </Form.Item>
    </Form>
  )
}

export default FormCustomerSegment
