import { UserOutlined , TeamOutlined, LineChartOutlined, MailOutlined, ApartmentOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import CusCard from '../../components/CusCard'
import { Button, Col, Grid, List, Row, Space, Tag } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { companyIndustries, currentDevStage, teamDescription } from '../../utils/form.constants'
import axios from 'axios'
import { deployedAPI } from '../../utils/form.constants'

const iconKey = {
  name: <UserOutlined />,
  email: <MailOutlined />,
  'current development stage': <LineChartOutlined/>,
  team: <TeamOutlined/>
}

const iconGenerated = () => {

}

const IdeaDescriptionPage = () => {
  let params = useParams()
  const {ideaId} = params

  const [fetchIdeas, setFetchIdeas] = useState([])
  const [idea, setIdea] = useState({})

  useEffect(() => {
    const fetchIdea = async () => {
      let response = await axios.get('https://share-your-idea.onrender.com/idea').then(res => res.data)
      setFetchIdeas(response.data)
      // console.log(response.data[0]._id.$oid)
    }
    fetchIdea()
  }, [])

  useEffect(() => {
    if (fetchIdeas.length > 0) {
      let idea = fetchIdeas.find(item => item._id.$oid === ideaId)
      setIdea(idea)
    }
  }, [fetchIdeas])


  const dataSourceGenerate = (ideaObj) => {
    let {author} = ideaObj
    author['current development stage'] = ideaObj.currentDev
    let res = []
    for (const [key, value] of Object.entries(author)) {
      res.push({
        title: key,
        content: value
      })
    }
    console.log('res', res)
    return res
  }

  return (
    <div>
      <section className={classNames(styles.bg)}>
        <div className={classNames('w-90', styles.description)}>
          {idea.name} - {idea.slogan} <br />
          {/* {idea.domain.map((item, idx) => (<Tag key={idx} color={'cyan'}>{item}</Tag>))} */}
        </div>
        <div className={classNames(styles['bg-circle'])}/>
      </section>

      <CusCard>
        <Row gutter={[8,8]}>
          <Col span={8}>
            <h1 className={styles.slogan}>{idea.slogan}</h1>
            {/* {idea.tag.map((item, idx) => (<Tag key={idx} color={'orange'}>{item}</Tag>))} */}
            {/* <List
              style={{marginTop: '50px'}}
              itemLayout="vertical"
              size="large"
              dataSource={dataSourceGenerate(idea)}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  style={{marginBottom: '5px'}}
                >
                  <List.Item.Meta avatar={iconKey[item.title]} title={item.title} description={item.content} />
                </List.Item>)}
            /> */}
            <Button type='primary'>Contact</Button>
          </Col>
          <Col span={16} className={styles.decor}>
            <h1>{idea.slogan}</h1>
            <h1 className={styles.title}>Idea Pitch</h1>
            <h3 style={{lineHeight: 2}}>{idea.summary}</h3>
            <Row gutter={[8,8]}>
              <Col span={12}><h2 className={styles.title}>Customer Segment</h2></Col>
              <Col span={12}><h2 className={styles.title}>Value Propositions</h2></Col>
            </Row>
          </Col>
        </Row>
      </CusCard>
    </div>
  )
}

export default IdeaDescriptionPage
