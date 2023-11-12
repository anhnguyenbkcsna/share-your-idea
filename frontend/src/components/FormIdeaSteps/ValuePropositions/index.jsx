import React from 'react'
import { Form, Input, Select } from 'antd'
import {
  currentDevStage,
  localStorageStepFormat,
  standoutReasons,
} from '../../../utils/form.constants'
import SingleFormProgress from '../../FormProgress'
import { labelValueGenerate } from '../../../utils/utils'
const {TextArea} = Input

const normFile = (fileList) => {
  console.log('file', fileList)
  if (Array.isArray(fileList)) {
    console.log(
      '>>>>>>  e?.fileList',
      fileList.map((file) => file.originFileObj)
    )
    // return fileList.map((file) => file.originFileObj)
    return new Blob(fileList.map((file) => file.originFileObj))
  }
  // return fileList.map((file) => file.originFileObj)
  return fileList ? fileList : []
}

const FormValuePropositions = (props) => {
  // const { setFileList, form, name } = props

  const handleChange = (value) => {
    console.log(`Value Prop selected ${value}`)
  }
  return (
    <>
      <Form.Item
        name="apps"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
        label="Những ứng dụng tương tự và các vấn đề mà chúng gặp phải"
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="outstand"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
        label="Điểm nổi bật của ý tưởng?"
      >
        <Select
          mode="tags"
          placeholder="You could enter your own labels in short description"
          onChange={handleChange}
          options={standoutReasons}
        />
      </Form.Item>

      <Form.Item
        name="currentDev"
        rules={[{ required: true, message: 'Vui lòng chọn một' }]}
        label="Quá trình phát triển"
      >
        <Select
          // mode="tags"
          placeholder="Vui lòng chọn quá trình phát triển của ý tưởng"
          onChange={handleChange}
          options={labelValueGenerate(currentDevStage)}
        />
      </Form.Item>

      {/* <Form.Item
        name="moneymaker"
        placeholde="Your Marketing - Business Strategy"
        label="How can you make money from your solution?"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <TextArea rows={3} />
      </Form.Item> */}

      {/* <Form.Item
        name="commitment"
        placeholde="4-6 months commitment"
        label="Impress your sponsor with your commitment"
        rules={[{ required: true, message: 'Hãy nhập mô tả còn thiếu' }]}
      >
        <TextArea rows={3} />
      </Form.Item> */}
    </>
  )
}

export default FormValuePropositions
