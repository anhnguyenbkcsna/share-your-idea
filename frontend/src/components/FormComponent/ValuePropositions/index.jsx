import React from 'react'
import { Form, Input, Select } from 'antd'
import {
  localStorageStepFormat,
  standoutReasons,
} from '../../../utils/form.constants'
import SingleFormProgress from '../../FormProgress'
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
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="Are there any applications direct the same issue?"
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="outstand"
        rules={[{ required: true, message: 'We need your specification!' }]}
        label="What makes your idea stand out?"
      >
        <Select
          mode="tags"
          placeholder="Please select or enter your answer"
          onChange={handleChange}
          options={standoutReasons}
        />
      </Form.Item>

      <Form.Item
        name="moneymaker"
        placeholde="Your Marketing - Business Strategy"
        label="How can you make money from your solution?"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="commitment"
        placeholde="4-6 months commitment"
        label="Impress your sponsor with your commitment"
        rules={[{ required: true, message: 'We need your specification!' }]}
      >
        <TextArea rows={3} />
      </Form.Item>
    </>
  )
}

export default FormValuePropositions
