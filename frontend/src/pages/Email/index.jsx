import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Input, Button, Radio, Form } from 'antd'

import contact from './contact.txt'
import failedContest from './failedContest.txt'
import passContest from './passContest.txt'
import sponsor from './sponsor.txt'

const { TextArea } = Input

const EmailPage = () => {
  const [form] = Form.useForm()
  const [value, setValue] = useState('cc')
  const [receivers, setReceivers] = useState([])
  const [emailType, setEmailType] = useState('Notification')

  const onEmailTypeChange = (value) => {
    switch (value) {
    case 'PassContest':
      form.setFieldsValue({
        Subject: 'Congratulations! You\'ve Advanced in the [Contest Name] Competition!',
      })
      fetch(passContest)
        .then((r) => r.text())
        .then((text) => form.setFieldsValue({ Content: text }))
      break
    case 'FailContest':
      form.setFieldsValue({
        Subject: 'Thank You for Participating in the [Contest Name] Competition!',
      })
      fetch(failedContest)
        .then((r) => r.text())
        .then((text) => form.setFieldsValue({ Content: text }))
      break
    case 'Contact':
      form.setFieldsValue({
        Subject: 'Congratulations! Let\'s Discuss Bringing Your [Project Name] to Life',
      })
      fetch(contact)
        .then((r) => r.text())
        .then((text) => form.setFieldsValue({ Content: text }))
      break
    case 'Sponsorship':
      form.setFieldsValue({
        Subject: 'Potential Sponsorship for Your Innovative [Project Name]',
      })
      fetch(sponsor)
        .then((r) => r.text())
        .then((text) => form.setFieldsValue({ Content: text }))
      break
    default:
    }
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onFinish = (values) => {
    console.log(values)
  }

  useEffect(() => {
    localStorage.getItem('email') && setReceivers(localStorage.getItem('email').split(','))
    form.setFieldsValue({ Receiver: localStorage.getItem('email') })
  }, [])

  return (
    <div>
      <Radio.Group
        onChange={(e) => {
          setEmailType(e.target.value)
          onEmailTypeChange(e.target.value)
        }}
        value={emailType}
        style={{ marginBottom: '16px', display: 'block', display: 'flex', justifyContent: 'center'}}
      >
        <Radio.Button value='PassContest'>Pass Contest</Radio.Button>
        <Radio.Button value='FailContest'>Fail Contest</Radio.Button>
        <Radio.Button value='Contact'>Contact</Radio.Button>
        <Radio.Button value='Sponsorship'>Sponsorship</Radio.Button>
      </Radio.Group>
      <Form
        form={form}
        onFinish={onFinish}
        name='emailForm'
        className={styles.emailContainer}
      >
        <div className={styles.receiver}>
          <Form.Item
            name='Receiver'
            rules={[{ required: true }]}
            style={{ width: '80%' }}
          >
            <TextArea placeholder='To' autoSize={{ minRows: 1 }} />
          </Form.Item>
          <Form.Item name='CC' rules={[{ required: false }]}>
            <Radio.Group onChange={onChange} value={value} defaultValue='cc'>
              <Radio.Button value={'cc'} className={styles.radioBtn}>
                CC
              </Radio.Button>
              <Radio.Button value={'bcc'} className={styles.radioBtn}>
                BCC
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item name='Subject' rules={[{ required: true }]}>
          <TextArea placeholder='Subject' autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item name='Content' rules={[{ required: true }]}>
          <TextArea autoSize={{ minRows: 10 }} placeholder='Content' />
        </Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{
            margin: '20 auto',
            width: '20%',
            display: 'block',
          }}
        >
          Send
        </Button>
      </Form>
    </div>
  )
}

export default EmailPage
