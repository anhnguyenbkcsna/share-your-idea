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
        label="Giới tính"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <Select
          placeholder="Vui lòng chọn giới tính"
          onChange={handleChange}
          options={gender}
        />
      </Form.Item>

      <Form.Item
        name="ageRange"
        label="Giới hạn độ tuổi"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <Slider range step={1} initialValues={[20, 50]} />
      </Form.Item>

      <Form.Item
        name="professional"
        label="Đối tượng khách hàng"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <Select
          mode="tags"
          placeholder="Vui lòng chọn đối tượng khách hàng"
          onChange={handleChange}
          options={customerJobs}
        />
      </Form.Item>

      <Form.Item
        name="geographical"
        label="Vị trí địa lý"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <Select
          mode="tags"
          placeholder="Vui lòng chọn đối tượng khách hàng"
          onChange={handleChange}
          options={residential}
        />
      </Form.Item>

      <Form.Item
        name="behavior"
        label="Tại sao bạn nghĩ khách hàng sẽ ưu tiên sử dụng ý tưởng của bạn?"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <Input.TextArea
          allowClear
          placeholder="Hãy mô tả những điểm nổi bật của ý tưởng khiến khách hàng bị thu hút"
          autoSize={{ minRows: 2, maxRows: 10 }}
        />
      </Form.Item>
    </div>
  )
}

export default FormCustomerSegment
