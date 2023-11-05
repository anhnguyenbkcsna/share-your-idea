import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { domains, localStorageStepFormat } from '../../utils/form.constants'
import { useState } from 'react'

const SingleFormProgress = (props) => {
  const {first, last, name, children, next, prev, done} = props
  const [initValues, setInitValues] = useState({})
  console.log('children', children)

  useEffect(() => {
    const keep = localStorage.getItem(localStorageStepFormat(0))
    if (keep && keep !== 'undefined') {
      setInitValues(JSON.parse(keep))
    }
  }, [])

  return (
    <Form
      key={name}
      name={name}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={initValues}
    >
      {children}
      {!first && <Button shape='round'
        style={{marginRight: '10px'}}
        htmlType='submit' onClick={() => prev()}>Previous</Button>}
      {!last ?
        <Button shape='round' htmlType='submit' onClick={() => next()}>Next</Button> :
        <Button shape='round' htmlType='submit' onClick={() => done()}>Submit</Button>}
    </Form>
  )
}

export default SingleFormProgress
