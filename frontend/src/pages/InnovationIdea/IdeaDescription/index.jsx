import React, { useState, useEffect } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { Button, Col, Divider, Row, Tag, Descriptions } from 'antd'
import axios from 'axios'
import classNames from 'classnames'
import styles from './styles.module.scss'
import CusCard from '../../../components/CusCard'
import { deployedAPI } from '../../../utils/form.constants'
import {
  UserOutlined,
  TeamOutlined,
  LineChartOutlined,
  MailOutlined,
  BulbOutlined,
} from '@ant-design/icons'

import NotFoundPage from '../../Error/E404'
import CommentList from '../../../components/IdeaListComponent'
import { getAllIdeas } from '../../../api/idea'
import { localStorageConstant } from '../../../utils/global.constants'

// const iconKey = {
//   name: <UserOutlined />,
//   email: <MailOutlined />,
//   'current development stage': <LineChartOutlined />,
//   team: <TeamOutlined />,
// }

const rmvQuote = (str) => {
  // return str && str.split('"').join('')
  return str
}

const comments = [
  {
    'id': '655e012d9bce09ceaefabb64',
    'date': '26-10-2023',
    'content': 'This is a comment!',
    'like': 3156,
    'dislike': 76,
  },
  {
    'id': '65635cc73ec6e1780b1df38b',
    'date': '26-10-2023',
    'content': 'This is another comment!',
    'like': 3156,
    'dislike': 76,
  }
]

const IdeaDescriptionPage = () => {
  let params = useParams()
  const navigate = useNavigate()
  const { ideaId } = params
  
  const [author, setAuthor] = useState({})
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [idea, setIdea] = useState({})

  useEffect(() => {
    // const fetchAuthor = async () => {
    //   let response = await axios
    //     .get(`${deployedAPI}/users/`)
    //     .then((res) => res.data)
    //   setAuthor(response.data)
    // }
    // fetchAuthor()
    setAuthor(
      {
        key: 1,
        label: 'Tên',
        children: localStorage.getItem('name')
      },
      {
        key: 2,
        label: 'Email',
        children: localStorage.getItem('email')
      }
    )
    console.log('author', author)
  }, [])

  useEffect(() => {
    const fetchIdea = async () => {
      const allIdeas = await getAllIdeas()
      setFetchIdeas(allIdeas)
    }
    fetchIdea()
  }, [])

  useEffect(() => {
    if (fetchIdeas.length > 0) {
      let idea = fetchIdeas.find((item) => item.id === ideaId)
      setIdea(idea)
    }
  }, [fetchIdeas])

  const dataSourceGenerate = (ideaObj) => {
    let { author } = ideaObj
    author['current development stage'] = ideaObj.currentDev
    let res = []
    for (const [key, value] of Object.entries(author)) {
      res.push({
        title: key,
        content: value,
      })
    }
    console.log('res', res)
    return res
  }

  const getUserFromLocal = () => {}

  return (
    <>
      {idea != null ? (
        <div>
          <section className={classNames(styles.bg)}>
            <div className={styles.ideaname}>
              <div className={classNames('w-90', styles.description)}>
                <h2
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                  }}
                >
                  {rmvQuote(idea.name)}
                </h2>

                <br />
                {idea.domain &&
                  idea.domain.map((item, idx) => (
                    <Tag className={styles.tags} key={idx} color='#427DDB'>
                      {item}
                    </Tag>
                  ))}
              </div>
              <div className={classNames(styles['bg-circle'])} />
            </div>
          </section>

          <CusCard>
            <Descriptions bordered>
              <Descriptions.Item 
                labelStyle={{backgroundColor: '#ddd'}}
                contentStyle={{backgroundColor: '#eee'}}
                label='Họ và tên'
              >
                {localStorage.getItem('name')}
              </Descriptions.Item>
              <Descriptions.Item 
                labelStyle={{backgroundColor: '#ddd'}}
                contentStyle={{backgroundColor: '#eee'}}
                label='Email'
              >
                {localStorage.getItem('email')}
              </Descriptions.Item>
              <Descriptions.Item 
                labelStyle={{backgroundColor: '#ddd'}}
                contentStyle={{backgroundColor: '#eee'}}
                label='Ngày đăng'
              >
                {new Date().toJSON().slice(0,10)}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <h3 className={styles.slogan}>
              {rmvQuote(idea.slogan)} <BulbOutlined />
            </h3>
            <Row gutter={[8, 8]}>
              <Col span={8} className={styles.decor}>
                <h2 className={styles.title}>Thông tin nhóm</h2>
                <h3 className={styles.content}>
                  <span className={styles.subtitle}>Số lượng thành viên: </span>
                  {rmvQuote(idea.teamDescription)}
                </h3>
                <h3 className={styles.content}>
                  <span className={styles.subtitle}>Kinh nghiệm: </span>
                  {rmvQuote(idea.teamExperience)}
                </h3>

                <Button type='primary' className={styles.btn} onClick={() => 
                  {
                    localStorage.setItem('ideaId', idea.id)
                    localStorage.setItem('email', localStorage.getItem(localStorageConstant.EMAIL))
                    navigate('/email')
                  }
                }>
                  <MailOutlined />
                  Liên hệ
                </Button>
              </Col>

              <Col span={16} className={styles.decor}>
                <h2 className={styles.title}>Vấn đề gặp phải</h2>
                <h3 className={styles.content}>{rmvQuote(idea.problem)}</h3>
                <Divider />

                <h2 className={styles.title}>Hướng giải quyết</h2>
                <h3 className={styles.content}>{rmvQuote(idea.solution)}</h3>
                <Divider />

                <h2 className={styles.title}>Đề xuất giá trị</h2>
                {idea.apps && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>
                      Các ứng dụng liên quan:{' '}
                    </span>
                    {rmvQuote(idea.apps)}
                  </h3>
                )}

                {idea.outstand && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Ưu điểm: </span>
                    {rmvQuote(idea.outstand)}
                  </h3>
                )}

                <h3 className={styles.content}>{rmvQuote(idea.currentDev)}</h3>
                <h2 className={styles.title}>Đối tượng khách hàng</h2>
                <br />

                {idea.gender && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Giới tính: </span>
                    {rmvQuote(idea.gender)}
                  </h3>
                )}

                {idea.ageRange && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Độ tuổi: </span>
                    {idea.ageRange[0]} - {idea.ageRange[1]} tuổi
                  </h3>
                )}

                {idea.professional && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Nghề nghiệp: </span>
                    {idea.professional
                      .map((item, idx) => rmvQuote(item))
                      .join(', ')}
                  </h3>
                )}

                {idea.geographical && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Khu vực: </span>
                    {idea.geographical
                      .map((item, idx) => rmvQuote(item))
                      .join(', ')}
                  </h3>
                )}

                {idea.behavior && (
                  <h3 className={styles.content}>
                    <span className={styles.subtitle}>Thói quen: </span>
                    {rmvQuote(idea.behavior)}
                  </h3>
                )}
              </Col>
              <Divider />

              {idea.files && (
                <div className={styles.fileList}>
                  <h3 className={styles.subtitle}>Tài liệu đính kèm: </h3>
                  {idea.files.map((item, idx) => {
                    return (
                      <div className={styles.file} key={idx}>
                        <Button type='primary' href={item.link}>
                          Download
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
              <Divider />
              <div className={styles.support}>
                {idea.support !== 'undefined' && (
                  <div className={styles.content}>
                    <h3 className={styles.content}>
                      <span className={styles.subtitle}>
                        Hỗ trợ nhóm phát triển dự án:{' '}
                      </span>
                      {rmvQuote(idea.support)}
                    </h3>
                  </div>
                )}
              </div>
            </Row>
            <CommentList comments={comments}/>
          </CusCard>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  )
}

export default IdeaDescriptionPage
