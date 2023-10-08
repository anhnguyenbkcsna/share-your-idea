// import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Input, Select } from 'antd'
import { competitors, localStorageStepFormat } from '../../../utils/constants'

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

const Competitors = (props) => {
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
        name="competitors"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="The buffet restaurant like Manwah, Gogi, etc."
      >
        <Select
          mode="targets"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={competitors}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="strengths"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What are your competitors doing well?"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
          placeholder="Why do you need a new idea?"
        />
      </Form.Item>

      <Form.Item
        name="weaknesses"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What are they doing poorly?"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
          placeholder='They don’t have different combos for their customer’s favourite cuisine.'
        />
      </Form.Item>

      <Form.Item
        name="unique"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Which is your unique point that make you different with others?"
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

export default Competitors
