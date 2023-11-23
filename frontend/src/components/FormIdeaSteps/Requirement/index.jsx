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
  const [problem, setProblem] = useState('')

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
        name="description"
        label="Vần đề cụ thể mà doanh nghiệp quan tâm"
      >
        <TextArea
          rows={3}
          showCount maxLength={100}
          allowClear
          placeholder="Những tiêu chí đánh giá một đề tài là thành công..."
          onChange={(e) => {setProblem(e.target.value)}}
        />
      </Form.Item>

      {problem &&
      <Form.Item
        name="success"
        required
        label="Những tiêu chí ăn điểm của ý tưởng"
      >
        <TextArea
          rows={3}
          showCount maxLength={100}
          allowClear
          placeholder="Giải pháp dựa trên AI, hệ thống Web/App,..."
          // onChange={()}
        />
      </Form.Item>
      }

      {problem &&
      <Form.Item
        name="constraint"
        required
        label="Những ràng buộc (Not interested approach)"
      >
        <TextArea
          rows={3}
          showCount maxLength={100}
          allowClear
          placeholder="Giải pháp không sử dụng cho ngôn ngữ Tiếng Anh..."
          // onChange={()}
        />
      </Form.Item>
      }

    </>
  )
}

export default RequirementForm
