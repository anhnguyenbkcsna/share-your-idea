import React, { useState, useEffect } from "react"
import { Form, Input } from "antd"
import { InputNumber } from "antd"

const formItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
  minWidth: 600
}

export default function MarkItem({ criteria, formName }) {
  const [mark, setMark] = useState({
    value: 0,
  })

  const validateMark = (value) => {
    if (value >= 0 || value <= 10) {
      return {
        validateStatus: "success",
        errorMsg: null,
      }
    } else {
      return {
        validateStatus: "error",
        errorMsg: "Điểm phải nằm trong khoảng từ 0 đến 10",
      }
    }
  }
  const onMarkChange = (value) => {
    setMark({
      ...validateMark(value),
      value: value,
    })
  }

  return (
    <Form.Item
      {...formItemLayout}
      label={criteria}
      validateStatus={mark.validateStatus}
      help={mark.errorMsg || ""}
      name={formName}
      required
    >
      <InputNumber min={0} max={10} value={mark.value} onChange={onMarkChange} style={{ minWidth: 200 }}/>
    </Form.Item>
  )
}