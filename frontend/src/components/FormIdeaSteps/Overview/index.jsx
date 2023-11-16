import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { companyIndustries, domains, localStorageStepFormat, teamDescription } from '../../../utils/form.constants'
import { useEffect, useRef } from 'react'
import SingleFormProgress from '../../FormProgress'
import { labelValueGenerate } from '../../../utils/utils'

import { useDispatch } from 'react-redux'
import { incrementByAmount, decrementByAmount } from '../../../redux/actions/createIdea'

const textRules = {
  required: true,
  type: 'string',
  max: 20,
}

const minWordsValidator = (minWords) => {
  return ({ getFieldsValue }) => ({
    validator(rules, value) {
      if (value && value.length >= minWords) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Not enough details for ${rules.field}`))
    },
  })
}

const maxWordsValidator = (maxWords) => {
  return ({ getFieldsValue }) => ({
    validator(rules, value) {
      if (value.length <= maxWords) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Too much characters for ${rules.field} field`))
    },
  })
}

const normFile = (obj) => {
  const files = obj.fileList.map((file) => {
    return {
      crossOrigin: file.crossOrigin && '',
      name: file.name,
      percent: file.percent,
      status: file.status,
      thumbUrl: file.thumbUrl,
      uid: file.uid,
      url: file.url,
      originFileObj: file.originFileObj,
    }
  })

  console.log('>>>>>>  obj', files, obj.fileList)
  return files
}

const FormOverview = (props) => {
  // const dispatch = useDispatch()

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  // const focusInput = () => {
  //   inputElement.current.focus()
  // }

  return (
    <div>
      <Form.Item
        name="name"
        required
        rules={[maxWordsValidator(200)]}
        label="Tên ý tưởng"

      >
        <Input allowClear />
      </Form.Item>

      <Form.Item
        name="domain"
        required
        rules={[maxWordsValidator(100)]}
        label="Lĩnh vực"
      >
        <Select
          mode="multiple"
          placeholder="Hãy chọn lĩnh vực của ý tưởng"
          options={labelValueGenerate(companyIndustries)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="slogan"
        rules={[maxWordsValidator(150)]}
        label="Slogan"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="problem"
        required
        rules={[minWordsValidator(10)]}
        label="Vấn đề"
      >
        <Input.TextArea
          placeholder="Vấn đề bạn muốn giải quyết là gì?"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="solution"
        required
        rules={[minWordsValidator(60)]}
        label="Giải pháp"
      >
        <Input.TextArea
          placeholder="Hướng giải quyết mà bạn muốn đề xuất là gì?"
          autoSize={{ minRows: 4, maxRows: 20 }}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="teamDescription"
        label="Nhóm thực hiện"
        required
      >
        <Select
          placeholder="Hãy nhập thông tin về nhóm"
          options={labelValueGenerate(teamDescription)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="teamExperience"
        label="Kinh nghiệm làm việc của nhóm"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>
    </div>
  )
}

export default FormOverview
