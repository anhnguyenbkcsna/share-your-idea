import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Form, Button, Input, Slider, Upload, Select, Col, Row, message } from 'antd'
import {
  gender,
  localStorageStepFormat,
  residential,
} from '../../utils/form.constants'
import { occupationGroups, userRole } from '../../utils/profile.constants'
import FormSlogan from '../../components/FormIdeaSteps/Title'
import { useState } from 'react'
import Dragger from 'antd/es/upload/Dragger'
import { createProfileApi } from '../../api/google'

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

const getBase64 = (img, callback) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const normFile = (fileInfo) => {
  const {fileList} = fileInfo
  if (Array.isArray(fileList)) {
    console.log(
      '>>>>>>  e?.fileInfo',
      fileList.map((file) => file.originFileObj)
    )
    return fileList.map((file) => file.originFileObj)
  }
  return fileList
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const CreateProfileForm = (props) => {
  const { form } = props
  const [profileRole, setProfileRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileList ,setFileList] = useState([])
  const [imageUrl, setImageUrl] = useState()

  const uploadFile = (info) => {
    console.log('info', info)
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      console.log('info.file.originFileObj', info.file.originFileObj)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
      setFileList(info.file.originFileObj)
    }
  }

  // const uploadFiles = async (upload) => {
  //   const { file, fileList } = upload
  //   setFileList(fileList)
  //   console.log('>>>>>> file', fileList)
  // }

  const onSubmitHandler = (values) => {
    createProfileApi({
      data: values,
      files: fileList
    },
    () => message.success('Submit Successfuly'),
    () => message.error('Submit Failed'))
  }

  // If possible, upload Avatar Photo
  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        minWidth: 600,
      }}
      initialValues={JSON.parse(
        localStorage.getItem(localStorageStepFormat(1))
      )}
      onFinish={onSubmitHandler}
    >
      <FormSlogan sloganList={['Your first time logged in?', 'Create Your Account!']} />
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="avatar"
            rules={[{ required: true, message: 'We need your specification!' }]}
            label="Upload your avatar"
            fileList={fileList}
            // valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-circle"
              beforeUpload={beforeUpload}
              onChange={uploadFile}
              style={{ maxWidth: '70%' }}
              maxCount={1}
              customRequest={dummyRequest}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
            </Upload>
          </Form.Item>
          <Form.Item
            name="userRole"
            label="Role"
            rules={[{ required: true, message: 'We need your specification!' }]}
          >
            <Select
              placeholder="Are you innovator or sponsor?"
              onChange={(value) => {setProfileRole(value)}}
              options={userRole}
            />
          </Form.Item>

          <Form.Item
            name="major"
            label="Current Major"
            rules={[{ required: true, message: 'We need your specification!' }]}
          >
            <Select
              mode="tags"
              placeholder="Your major is related to..."
              onChange={(value, opts) => {console.log('major value', value)}}
              options={occupationGroups}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'We need your specification!' }]}
          >
            <Input.TextArea rows={1} allowClear maxLength={15}/>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'We need your specification!' }]}
          >
            <Select
              placeholder="Please select"
              // onChange={handleChange}
              options={gender}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Special Description"
            rules={[{ required: true, message: 'We need your specification!' }]}
          >
            <Input.TextArea allowClear />
          </Form.Item>
        </Col>
        <Col span={12} />
      </Row>
      <Button htmlType='submit'>Submit</Button>
    </Form>
  )
}

export default CreateProfileForm

