import React, { useState } from 'react'
import { Typography } from 'antd'
import { Button, message, Steps } from 'antd'
import FormOverview from './Overview'
import { Form, Input, Slider, Upload } from 'antd'
import FormCustomerSegment from './CustomerSegment'
import FormValuePropositions from './ValuePropositions'
import FormSteps from '../FormSteps'

const steps = [
  {
    title: 'First',
    content: 'Overview',
  },
  {
    title: 'Second',
    content: 'Customer Segments',
  },
  {
    title: 'Third',
    content: 'Value Position',
  },
  //   {
  //     title: 'Last',
  //     content: 'Furthur Information',
  //   },
]

const FormComponent = () => {
  const [current, setCurrent] = useState(0)
  const [fileList, setFileList] = useState([])
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  const finishForm = async () => {
    const data = new FormData()
    data.append('image', new Blob(fileList), 'file_list_name')
    console.log('------- data', fileList, data)
    const result = await fetch(
      'http://127.0.0.1:8000/idea/65057546c5ba16ab88f1cecc/',
      {
        method: 'POST',
        // headers: {
        //     // "Content-Type": "application/json",
        //     'Content-Type': 'multipart/form-data',
        // },
        body: data,
      }
    ).then((res) => {
      console.log('>>>>>>> response', res)
      return res.data
    })

    const obj = result ? JSON.parse(result) : 'empty'
    console.log('>>>>> obj', obj)
  }

  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Typography.Title level={3}></Typography.Title>
        <FormSteps />
        {/* <Steps current={current} items={items} /> */}

        <Typography.Title level={3}>{steps[current].content}</Typography.Title>

        {/* Content */}
        {current === 0 && <FormOverview setFileList={setFileList} />}
        {current === 1 && <FormCustomerSegment setFileList={setFileList} />}
        {current === 2 && <FormValuePropositions setFileList={setFileList} />}
        {/* {current === 3 && <FormOverview setFileList={setFileList} />} */}

        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => finishForm()}>
              Done
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default FormComponent
