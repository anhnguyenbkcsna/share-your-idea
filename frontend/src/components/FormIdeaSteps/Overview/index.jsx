// import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Button, Form, Input, Select } from 'antd'
import { domains, localStorageStepFormat } from '../../../utils/form.constants'
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
  // const { setFileList, first, last, name ,nextHandler, prevHandler} = props

  // const uploadFiles = async (upload) => {
  //   const { file, fileList } = upload
  //   const files = fileList.map((file) => {
  //     return {
  //       crossOrigin: file.crossOrigin && '',
  //       name: file.name,
  //       percent: file.percent,
  //       status: file.status,
  //       thumbUrl: file.thumbUrl,
  //       uid: file.uid,
  //       url: file.url,
  //       originFileObj: file.originFileObj,
  //     }
  //   })
  //   setFileList(files)
  // }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
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
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={domains}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="slogan"
        rules={[wordsValidator(30)]}
        label="Project slogan"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
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
          placeholder="Overview about your target audience + objectives + your vision"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>
    </div>
  )
}

export default FormOverview
