import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { domains, localStorageStepFormat } from '../../utils/form.constants'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'

const SingleFormProgress = (props) => {
  const {first, last, name, children, next, prev, done} = props
  const [initValues, setInitValues] = useState({})
  const [form] = useForm()

  useEffect(() => {
    const keep = localStorage.getItem(localStorageStepFormat(0))
    if (keep && keep !== 'undefined') {
      setInitValues(JSON.parse(keep))
    }
  }, [])

  const onClickProgress = (callback) => {
    form.validateFields()
      .then((val) => {
        console.log('Validates', val)
        callback(val)
      })
      .catch((err) => {
        console.log('** error after validate', err)
      })
  }

  return (
    <Form
      form={form}
      key={name}
      name={name}
      layout="vertical"
      style={{
        minWidth: 600,
        maxWidth: '80%',
      }}
      initialValues={initValues}
    >
      {children}
      {!first && <Button
        style={{marginRight: '10px'}}
        htmlType='submit' onClick={() => prev()}>Previous</Button>}
      {!last ?
        <Button htmlType='submit'
          onClick={() => onClickProgress(next)}>Next</Button> :
        <Button htmlType='submit' onClick={() => onClickProgress(done)}>Submit</Button>}
    </Form>
  )
}

export default SingleFormProgress
