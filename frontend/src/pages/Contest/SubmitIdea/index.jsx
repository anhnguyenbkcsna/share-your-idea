import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Table } from 'antd'
import { HrHeading } from '../Components/hrheading'
import { OrangeBasicButton } from '../Components/button'
import { contestSubmission, getContestById } from '../../../api/contest'
import { getAllIdeas } from '../../../api/idea'
import { getAllUsers, getUserById } from '../../../api/user'
const columns = [
  {
    title: 'Tên bài dự thi',
    dataIndex: 'name',
  },
  {
    title: 'Điểm trung bình',
    dataIndex: 'averageMark',
    sorter: (a, b) => a.averageMark - b.averageMark,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div size="middle">
        <a 
          // onClick={() => {console.log(record._id.$oid)}}
          href={record && `ideas/${record._id.$oid}`}
        >
          Chấm điểm
        </a>
      </div>
    ),
  },
]

const SubmitIdeaPage = () => {
  const navigate = useNavigate()
  const [contestId, setContestId] = useState(window.location.pathname.split('/')[2])
  const [userId, setUserId] = useState([])
  const [ideaList, setIdeaList] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

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

  useEffect(() => {
    contestSubmission(contestId).then((res) => {
      console.log(res)
      setData(res)
    })   
  }, [])

  const getIdeas = () => {
    let listIdea = []
    data.forEach((idea) => {
      listIdea.push(idea.idea)
      // Chưa làm nè
    })
    console.log(listIdea)
    return listIdea
  }

  return (
    <div style={{ maxWidth: '80%', margin: '0 auto' }}>
      <HrHeading title="Danh sách bài dự thi" />
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }} >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={getIdeas()} />
      <OrangeBasicButton onClick={sendResultMail} disabled={!hasSelected} loading={loading} text='Gửi kết quả'/>
    </div>
  )
}
export default SubmitIdeaPage