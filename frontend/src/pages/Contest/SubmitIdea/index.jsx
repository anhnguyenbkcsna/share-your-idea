import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Flex, Table } from 'antd'
import { HrHeading } from '../Components/hrheading'
import { OrangeBasicButton } from '../Components/button'
import { contestSubmission, getContestById } from '../../../api/contest'
import { getAllIdeas } from '../../../api/idea'
import { getAllUsers, getUserById } from '../../../api/user'
import { localStorageConstant } from '../../../utils/global.constants'
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
          href={record && `ideas/${record.id}/mark`}
          disabled = {record.averageMark !== 0}
        >
          {record.averageMark === 0 ? 'Chấm điểm' : 'Đã chấm điểm'}
          {/* Chấm điểm */}
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
      console.log(data[key])
      // Get author's email through API
      // emailList.push(authorEmail)
      emailList.push(localStorage.getItem(localStorageConstant.EMAIL))
      // emailList.push(data[key])
    })
    localStorage.setItem('email', emailList)
    navigate('/email')
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
    console.log('selectedRowKeys: ', selectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  useEffect(() => {
    contestSubmission(contestId).then((res) => {
      // let averageMark
      res = res.map((submission) => {
        submission.name = submission.idea?.name
        submission.key = submission.idea?._id.$oid
        // Chưa chấm điểm
        if (!submission.grades) {
          submission.averageMark = 0
          return submission
        }
        // Đã chấm điểm
        let sum = 0
        submission.grades?.map((grade) => {
          sum += grade
        })
        submission.averageMark = sum / submission.grades?.length
        return submission
      })
      console.log('>>> RES: ', res)
      setData(res)
    })

  }, [])

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