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
import CusCard from '../../components/CusCard'
import { userRoles } from '../../utils/global.constants'

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
    message.error('Chỉ tải được định dạng JPG/PNG!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Dung lượng không được quá 2MB!')
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
    () => message.success('Chỉnh sửa thành công'),
    () => message.error('Lỗi'))
  }

  // If possible, upload Avatar Photo
  return (
    <CusCard>
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
        <FormSlogan sloganList={['Đăng nhập lần đầu?', 'Tạo tài khoản!']} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="avatar"
              rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
              label="Tải hình đại diện"
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
              rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
            >
              <Select
                placeholder="Bạn là nhà sáng tạo hay nhà tài trợ?"
                onChange={(value) => {
                  console.log('value', value)
                  setProfileRole(value.toLowerCase())
                }}
                options={userRole}
              />
            </Form.Item>

            {profileRole === userRoles.INNOVATOR ?
              (<>
                <Form.Item
                  name="major"
                  label="Chuyên môn hiện tại"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Select
                    mode="tags"
                    placeholder= "Lĩnh vực liên quan"
                    onChange={(value, opts) => {console.log('major value', value)}}
                    options={occupationGroups}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Input.TextArea rows={1} allowClear maxLength={15}/>
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Select
                    placeholder="Please select"
                    // onChange={handleChange}
                    options={gender}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Mô tả ngắn"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Input.TextArea allowClear />
                </Form.Item>
              </>) :
              <div >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Input.TextArea allowClear />
                </Form.Item>
                <Form.Item
                  name="website"
                  label="Company Website"
                  rules={[{ required: true, message: 'Đây là trường bắt buộc!' }]}
                >
                  <Input.TextArea allowClear />
                </Form.Item>
              </div>}
          </Col>
          <Col span={12} />
        </Row>
        <Button htmlType='submit'>Gửi</Button>
      </Form>
    </CusCard>
  )
}

export default CreateProfileForm

