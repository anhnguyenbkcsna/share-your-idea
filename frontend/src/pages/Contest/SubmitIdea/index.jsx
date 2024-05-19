import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Table } from 'antd'
import { HrHeading } from '../Components/hrheading'
import { OrangeBasicButton } from '../Components/button'
const columns = [
  {
    title: 'Tên bài dự thi',
    dataIndex: 'name',
  },
  {
    title: 'Tác giả',
    dataIndex: 'author',
  },
  {
    title: 'Bình chọn',
    dataIndex: 'vote',
  },
  {
    title: 'Điểm trung bình',
    dataIndex: 'averageMark',
  }
]
const data = []
for (let i = 0; i < 24; i++) {
  data.push({
    key: i,
    name: `Bài dự thi số ${i}`,
    author: `Tác giả ${i}`,
    vote: 32,
    averageMark: 4.5,
  })
}
const SubmitIdeaPage = () => {
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  
  const sendResultMail = () => {
    let emailList = []
    selectedRowKeys.forEach((key) => {
      console.log(data[key].author)
      // Get author's email through API
      // emailList.push(authorEmail)
      emailList.push(data[key].author)
    })
    localStorage.setItem('email', emailList)
    navigate('/email')
    
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0
  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }}>
      <HrHeading title="Danh sách bài dự thi" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }} >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <OrangeBasicButton onClick={sendResultMail} disabled={!hasSelected} loading={loading} text='Gửi kết quả'/>
    </div>
  )
}
export default SubmitIdeaPage