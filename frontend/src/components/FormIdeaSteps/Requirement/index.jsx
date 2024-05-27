import React from 'react'
import { Form, Input, Select, Upload, Row, Col, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { companyIndustries } from '../../../utils/form.constants'
import { labelValueGenerate } from '../../../utils/utils'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
const { Dragger } = Upload
const { TextArea } = Input

const RequirementForm = (props) => {
  const [form] = useForm()

  return (
    <>
      <Form.Item
        form={form}
        name="domain"
        required
        rules={[{
          type: 'array',
          max: 3,
          min: 1,
          required: true,
          message: 'Tối đa 3 lĩnh vực'
        }]}
        label="Lĩnh vực"
      >
        <Select
          mode="multiple"
          placeholder="Lĩnh vực ý tưởng mà doanh nghiệp tìm kiếm"
          options={labelValueGenerate(companyIndustries)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="problem"
        label="Vần đề cụ thể mà doanh nghiệp quan tâm"
      >
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          showCount maxLength={500}
          allowClear
          placeholder="Những tiêu chí đánh giá một đề tài là thành công..."
        />
      </Form.Item>

      <Form.Item
        name="acceptance_criteria"
        required
        label="Những tiêu chí ăn điểm của ý tưởng"
      >
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          showCount maxLength={500}
          allowClear
          placeholder="Giải pháp dựa trên AI, hệ thống Web/App,..."
          // onChange={()}
        />
      </Form.Item>

      <Form.Item
        name="constraints"
        required
        label="Khoanh vùng giới hạn (Not interested approach)"
      >
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          showCount maxLength={500}
          allowClear
          placeholder="Giải pháp không sử dụng cho ngôn ngữ Tiếng Anh..."
          // onChange={()}
        />
      </Form.Item>

    </>
  )
}

export default RequirementForm
