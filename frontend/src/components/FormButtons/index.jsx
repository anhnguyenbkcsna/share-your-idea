import { Button, Form } from 'antd'
import React, { useState } from 'react'

const FormButtons = (props) => {
  const { form, currentStep, steps, prevHandler, nextHandler, finishForm } =
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
  }, [values])

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
          onClick={() => finishForm()}
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
