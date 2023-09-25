// import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { Form, Input, Select } from 'antd'
import { domains, localStorageStepFormat } from '../../../utils/constants'

const textRules = {
  required: true,
  type: 'string',
  max: 200,
}

const over30WordsValidator = ({ getFieldsValue }) => ({
  validator(rules, value) {
    if (!value || value.length >= 30) {
      return Promise.resolve(textRules)
    }
    return Promise.reject(new Error(`Not enough details for ${rules.field}`))
  },
})

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     console.log('>>>>>>  e?.fileList', e?.fileList)
//     return e
//   }
//   return e?.fileList
// }

const FormOverview = (props) => {
  const { form, name } = props
  // const uploadFiles = async (upload) => {
  //   const { file, fileList } = upload
  //   setFileList(fileList)
  //   console.log('>>>>>> file', fileList)
  // }

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
        rules={[textRules, over30WordsValidator]}
        label="Project slogan"
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 3 }}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item name="description" rules={[textRules]} label="Description">
        <Input.TextArea
          placeholder="Overview about your target audience + objectives + your vision"
          autoSize={{ minRows: 2, maxRows: 10 }}
        />
      </Form.Item>

      {/* <Form.Item
        name="upload"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload listType="picture-card" onChange={(e) => uploadFiles(e)}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item> */}
    </Form>
  )
}

export default FormOverview
