import React from 'react'
import { Form, Input, Select } from 'antd'
import {
  localStorageStepFormat,
  standoutReasons,
} from '../../../utils/constants'
const {TextArea} = Input;


const FormValuePropositions = (props) => {
  const { form } = props

  const handleChange = (value) => {
    console.log(`Value Prop selected ${value}`)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(2))
      )}
    >
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
    </Form>
  )
}

export default FormValuePropositions
