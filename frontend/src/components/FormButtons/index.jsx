import { Button, Form } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
// import { localStorageStepFormat } from '../../utils/constants'
const FormButtons = (props) => {
  const { form, currentStep, steps, prevHandler, nextHandler } =
    props

  const [submittable, setSubmittable] = useState(false)
  // Watch all values
  const values = Form.useWatch([], form)

  React.useEffect(() => {
    form
      .validateFields()
      .then((val) => {
        // console.log('(((( Vak', val)
        setSubmittable(true)
      })
      .catch((err) => {
        // console.log('** values', err)
        setSubmittable(false)
      })
  }, [values, form])

  const sendData = async () => {
    // let body = []
    // for (let i = 0; i < 3; i++) {
    //   let jsonStr = localStorage.getItem(localStorageStepFormat(i))
    //   const jsondata = JSON.parse(jsonStr)
    //   body = [...body, jsondata]
    // }
    // console.log('body', body)
    
    const data = {
      username: "admin",  
      password: "admin123",
      full_name: "admin",
      age: 12,
      email: "admin@example.com",
      number: "123123123",
      address: "Location"
    }

    await axios
      .post('http://127.0.0.1:8000/user/', data)
      .then((res) => {
        console.log('res.data', res.data)
        return res.data
      })
      .catch((err) => {
        console.log('axios err', err)
      })
  }

  return (
    <div style={{ marginTop: 24 }}>
      {currentStep > 0 && (
        <Button
          style={{ marginRight: '20px' }}
          onClick={() => prevHandler(form.getFieldsValue())}
        >
          Previous
        </Button>
      )}
      {currentStep < steps - 1 ? (
        <Button
          form={form}
          type="primary"
          onClick={() => nextHandler(form.getFieldsValue())}
          htmlType="submit"
          disabled={!submittable}
        >
          Next
        </Button>
      ) : (
        <Button
          form={form}
          type="primary"
          onClick={() => sendData()}
          htmlType="submit"
          disabled={!submittable}
        >
          Done
        </Button>
      )}
    </div>
  )
}

export default FormButtons
