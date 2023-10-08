// import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Input, Select } from 'antd'
import { targets, localStorageStepFormat } from '../../../utils/constants'

const textRules = {
  required: true,
  type: 'string',
  max: 200,
}

const wordsValidator = (minWords) => {
  return ({ getFieldsValue }) => ({
    validator(rules, value) {
      if (!value || value.length >= minWords) {
        return Promise.resolve(textRules)
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

const Problems = (props) => {
  const { setFileList, form, name } = props
  const uploadFiles = async (upload) => {
    const { file, fileList } = upload
    const files = fileList.map((file) => {
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
    setFileList(files)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <Form
      form={form}
      name={name}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(0))
      )}
    >
      <Form.Item
        name="painpoints"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What are your biggest pain points?"
      >
        <Input 
            allowClear 
            placeholder="We need a new system to take care our customers better."
        />
      </Form.Item>

      <Form.Item
        name="effectiveness"
        rules={[textRules, wordsValidator(30)]}
        label="What products or services would make your business easier?"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
          placeholder="Why do you need a new idea?"
        />
      </Form.Item>

      <Form.Item
        name="customerunmet"
        rules={[textRules, wordsValidator(30)]}
        label="What are your customers' unmet needs? What products or services would they love to have, but don't exist yet?"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
          placeholder=""
        />
      </Form.Item>
    </Form>
  )
}

export default Problems
