import React, { useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { domains, localStorageStepFormat } from '../../utils/form.constants'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'

import axios from 'axios'
import { ideaEndpoint } from '../../utils/api.constants'
import { localStorageConstant } from '../../utils/global.constants'

const SingleFormProgress = (props) => {
  const {first, last, name, children, next, prev, done, edit} = props
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [initValues, setInitValues] = useState({})
  const [form] = useForm()
  
  // Fetch and set initial values for form
  useEffect(() => {
    const fetchIdea = async () => {
      const allIdeas = await axios.get(ideaEndpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`
        }
      }).then((res) => {
        console.log("Fetch: ", res)
        return res.data.data
      })
      setFetchIdeas(allIdeas)
    }
    fetchIdea()
  }, [])

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
