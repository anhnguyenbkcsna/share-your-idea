// import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { companyIndustries, domains, industries, localStorageStepFormat } from '../../../utils/form.constants'
import { useEffect } from 'react'
import SingleFormProgress from '../../FormProgress'

const textRules = {
  required: true,
  type: 'string',
  max: 20,
}

const wordsValidator = (minWords) => {
  return ({ getFieldsValue }) => ({
    validator(rules, value) {
      if (value && value.length >= minWords) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`At least ${minWords} words for ${rules.field}`))
    },
  })
}

const FormOverview = (props) => {
  const onChangeArea = (value) => {
    // console.log('value', value)
    // setAreaList(areaList.filter(item => (item !== value[-1])))
  }

  return (
    <div>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Project name"
      >
        <Input allowClear placeholder='Our project is called...'/>
      </Form.Item>

      <Form.Item
        name="domain"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Industry Area (Domain)"
      >
        <Select
          mode="tags"
          placeholder="Multi-select or enter your answer"
          onChange={onChangeArea}
          options={companyIndustries.map((item) => {
            return {
              label: item,
              value: item
            }
          })}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="slogan"
        rules={[wordsValidator(30)]}
        label="Project slogan"
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 3 }}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[wordsValidator(60)]}
        label="Description"
      >
        <Input.TextArea
          placeholder="Overview about your objectives + your vision"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>
    </div>
  )
}

export default FormOverview
