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

const Specification = (props) => {
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
        name="domain"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Domain"
      >
        <Input 
            allowClear 
            placeholder="Which is your industry?"
        />
      </Form.Item>

      <Form.Item
        name="urgency"
        rules={[textRules, wordsValidator(30)]}
        label="Urgency"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
          placeholder="Why do you need a new idea?"
        />
      </Form.Item>

      <Form.Item
        name="targets"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Targets"
      >
        <Select
          mode="targets"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={targets}
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="exigency"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Exigency"
      >
        <Input.TextArea
          placeholder="Which case you need idea for?"
          autoSize={{ minRows: 2, maxRows: 10 }}
          showCount
        />
      </Form.Item>
    </Form>
  )
}

export default Specification
