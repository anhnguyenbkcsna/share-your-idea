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

const wordsValidator = (minWords) => {
  return ({ getFieldsValue }) => ({
    validator(rules, value) {
      if (value && value.length >= minWords) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(`Not enough details for ${rules.field}`))
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
  const inputElement = useRef()
  const dispatch = useDispatch()

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const focusInput = () => {
    inputElement.current.focus()
  }

  return (
    <div>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Project name"
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item
        name="domain"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Field (Domain)"
      >
        <Select
          mode="tags"
          // maxLength={3}
          placeholder="Please select or enter your answer"
          options={labelValueGenerate(companyIndustries.sort())}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="slogan"
        // rules={[wordsValidator(30)]}
        label="Project slogan"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="problem"
        rules={[wordsValidator(20)]}
        label="Problem"
      >
        <Input.TextArea
          placeholder="The problem your team want to solve"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[wordsValidator(60)]}  
        label="Description"
      >
        <Input.TextArea
          placeholder="The proposed technical solution is..."
          autoSize={{ minRows: 4, maxRows: 20 }}
          showCount
        />
      </Form.Item>

      <Form.Item
        name="teams"
        label="Team Description"
      >
        <Select
          // mode="tags"
          placeholder="Please select or enter your answer"
          options={labelValueGenerate(teamDescription)}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="experience"
        // rules={[wordsValidator(60)]}
        label="Team Experience"
      >
        <Input.TextArea
          placeholder="Your team experience"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>
    </div>
  )
}

export default FormOverview
